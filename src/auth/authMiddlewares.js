/************************************************** Internal logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node modules needed *************************************************/
/* Manage JSON Web Tokens (JWT) for authentication and authorization */
const jsonwebtoken = require("jsonwebtoken")

/************************************************* Internal libraries *************************************************/
const { statusCodes } = require("../constants/statusCodes.js")
const { ReviewModel } = require("../reviews/ReviewModel.js")
const { ConsumerModel } = require("../users/consumers/ConsumerModel.js")
const { WineryModel } = require("../users/wineries/WineryModel.js")
const { WineModel } = require("../wines/WineModel.js")

/* Regular expression to enforce password policy */
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/
const models = {
  consumers: ConsumerModel,
  wineries: WineryModel,
  wines: WineModel,
  reviews: ReviewModel,
}

const checkAllLoginCredentialsAreProvided = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    const errorText = "Missing required arguments: email and/or password!"
    logger.error(errorText)
    return res.status(statusCodes.BadRequest).send({ error: errorText })
  }
  if (!passwordRegex.test(password)) {
    const errorText = "Invalid password! It must have at least 8 characters, one uppercase letter, and one number."
    logger.error(errorText)
    return res.status(statusCodes.BadRequest).send({ error: errorText })
  }
  res.locals.loginData = { email, password }
  next()
}

const checkProvidedTokenIsValid = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]
    try {
      res.locals.loggedUserToken = jsonwebtoken.verify(token, process.env.JWT_SECRET)
      next()
    } catch (error) {
      const errorText = "Provided token is either invalid or expired!"
      logger.error(errorText, error)
      res.status(statusCodes.Unauthorized)
        .send({ error: errorText })
    }
  }
  else {
    const errorText = "No token was provided, access denied!"
    logger.error(errorText)
    res.status(statusCodes.Unauthorized)
      .send({ error: errorText })
  }
}

const checkWineryRole = (req, res, next) => {
  const { role } = res.locals.loggedUserToken

  if (role !== "wineries") {
    const errorText = "Unauthorized: Only wineries can manage wines."
    logger.error(errorText)
    return res.status(statusCodes.Forbidden).send({ error: errorText })
  }

  next()
}


const checkUserIsAuthorized = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: loggedUserId } = res.locals.loggedUserToken
    const resourceType = req.originalUrl.includes("/users/") ? req.originalUrl.split("/")[2] : req.originalUrl.split("/")[1]
    if (!models[resourceType]) {
      return res.status(400).json({ error: "Invalid request type!" })
    }
    const resource = resourceType === "wines" 
      ? await models[resourceType].findById(id).populate("winery")
      : await models[resourceType].findById(id)
    if (!resource) {
      return res.status(404).json({ error: `${resourceType.slice(0, -1)} not found!` })
    }
    const ownerId = resourceType === "wines" ? resource.winery._id.toString() : resource.user?.toString() || resource._id.toString()
    if (ownerId !== loggedUserId) {
      return res.status(403).json({ error: `You are not authorized to modify this ${resourceType.slice(0, -1)}!` })
    }
    next()
  } catch (error) {
    console.error("Authorization check failed!", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

/*************************************************** Module export ****************************************************/
module.exports = {
  checkAllLoginCredentialsAreProvided,
  checkProvidedTokenIsValid,
  checkWineryRole,
  checkUserIsAuthorized
}
