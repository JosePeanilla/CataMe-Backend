/************************************************** Internal Logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node Modules Needed *************************************************/
/* Manage JSON Web Tokens (JWT) for authentication and authorization */
const jsonwebtoken = require("jsonwebtoken")

/************************************************* Internal Libraries *************************************************/
const { statusCodes } = require("../constants/statusCodes.js")
const { ReviewModel } = require("../reviews/ReviewModel.js")
const { ConsumerModel } = require("../users/consumers/ConsumerModel.js")
const { WineryModel } = require("../users/wineries/WineryModel.js")
const { WineModel } = require("../wines/WineModel.js")

/* Password policy validation using regular expression */
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/

/* Models registry used for ownership validation */
const models = {
  consumers: ConsumerModel,
  wineries: WineryModel,
  wines: WineModel,
  reviews: ReviewModel,
}

/******************************************** Middleware: Login Validation ********************************************/
/**
 * Ensures both email and password are provided and that password follows required format.
 */
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

/**************************************** Middleware: Token Validation (JWT) ******************************************/
/**
 * Verifies that a valid token is provided in the Authorization header.
 */
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
      return res.status(statusCodes.Unauthorized).send({ error: errorText })
    }
  } else {
    const errorText = "No token was provided, access denied!"
    logger.error(errorText)
    return res.status(statusCodes.Unauthorized).send({ error: errorText })
  }
}

/***************************************** Middleware: Role Validation (Winery) ***************************************/
/**
 * Restricts access to winery-only actions (e.g., managing wines).
 */
const checkWineryRole = (req, res, next) => {
  const { role } = res.locals.loggedUserToken

  if (role !== "wineries") {
    const errorText = "Unauthorized: Only wineries can manage wines."
    logger.error(errorText)
    return res.status(statusCodes.Forbidden).send({ error: errorText })
  }

  next()
}

/************************************ Middleware: Authorization for Ownership *****************************************/
/**
 * Ensures that the logged-in user is authorized to access/modify the resource (owns it).
 */
const checkUserIsAuthorized = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: loggedUserId } = res.locals.loggedUserToken
    const resourceType = req.originalUrl.includes("/users/") ? req.originalUrl.split("/")[2] : req.originalUrl.split("/")[1]

    if (!models[resourceType]) {
      const errorText = "Invalid request type!"
      logger.error(errorText)
      return res.status(statusCodes.BadRequest).json({ error: errorText })
    }

    const resource = resourceType === "wines"
      ? await models[resourceType].findById(id).populate("winery")
      : await models[resourceType].findById(id)

    if (!resource) {
      const errorText = `${resourceType.slice(0, -1)} not found!`
      logger.error(errorText)
      return res.status(statusCodes.NotFound).json({ error: errorText })
    }

    const ownerId = resourceType === "wines"
      ? resource.winery._id.toString()
      : resource.user?.toString() || resource._id.toString()

    if (ownerId !== loggedUserId) {
      const errorText = `You are not authorized to modify this ${resourceType.slice(0, -1)}!`
      logger.error(errorText)
      return res.status(statusCodes.Forbidden).json({ error: errorText })
    }

    next()
  } catch (error) {
    const errorText = "Authorization check failed!"
    logger.error(errorText, error)
    return res.status(statusCodes.InternalServerError).json({ error: errorText })
  }
}

/*************************************************** Module Export ****************************************************/
module.exports = {
  checkAllLoginCredentialsAreProvided,
  checkProvidedTokenIsValid,
  checkWineryRole,
  checkUserIsAuthorized
}
