/************************************************** Internal Logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node Modules Needed *************************************************/
/* Manage JSON Web Tokens (JWT) for authentication and authorization */
const jsonwebtoken = require("jsonwebtoken")

/************************************************* Internal Libraries *************************************************/
const { authService } = require("./authService.js")
const { statusCodes } = require("../constants/statusCodes.js")

/* Controller for login and authentication requests */
const authController = {
  login: async (req, res) => {
    try {
      const { user, error } = await authService.login(res.locals.loginData)

      if (error === "not_found") {
        const msg = "No existe una cuenta con ese correo electrónico."
        logger.warn(msg)
        return res.status(statusCodes.NotFound).send({ error: msg })
      }

      if (error === "invalid_password") {
        const msg = "La contraseña introducida no es correcta."
        logger.warn(msg)
        return res.status(statusCodes.Forbidden).send({ error: msg })
      }

      if (error === "not_verified") {
        const msg = "La cuenta no está verificada. Revisa tu correo electrónico."
        logger.warn(msg)
        return res.status(statusCodes.Forbidden).send({ error: msg })
      }

      const token = jsonwebtoken.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_DEFAULT_EXPIRATION }
      )

      const successText = `User (${user.role}) logged in successfully!`
      logger.debug(successText)
      return res.status(statusCodes.OK).send({ msg: successText, data: token })

    } catch (error) {
      const errorText = "User could not be logged in!"
      logger.error(errorText, error)
      return res.status(statusCodes.InternalServerError).send({ msg: errorText, error: error.message })
    }
  },
}

/*************************************************** Module export ****************************************************/
module.exports = { authController }
