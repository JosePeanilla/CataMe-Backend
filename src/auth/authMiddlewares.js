/************************************************** Internal logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node modules needed *************************************************/
/* Manage JSON Web Tokens (JWT) for authentication and authorization */
const jsonwebtoken = require("jsonwebtoken")

/************************************************* Internal libraries *************************************************/
const { statusCodes } = require("../constants/statusCodes.js")
const { ReviewModel } = require("../reviews/ReviewModel.js")

/* Regular expression to enforce password policy */
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/

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
    const { id } = req.params; // ID de la review
    const { id: loggedUserId } = res.locals.loggedUserToken;

    const review = await ReviewModel.findById(id);
    if (!review) {
      return res.status(statusCodes.NotFound).send({ error: "Review not found!" });
    }

    if (review.user.toString() !== loggedUserId) {
      return res.status(statusCodes.Forbidden).send({ error: "You are not authorized to modify this review!" });
    }

    next();
  } catch (error) {
    logger.error("Authorization check failed!", error);
    res.status(statusCodes.InternalServerError).send({ error: "Internal Server Error" });
  }
}

/*************************************************** Module export ****************************************************/
module.exports = {
  checkAllLoginCredentialsAreProvided,
  checkProvidedTokenIsValid,
  checkWineryRole,
  checkUserIsAuthorized
}
