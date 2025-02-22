/************************************************** Internal logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node modules needed *************************************************/
/* Manage JSON Web Tokens (JWT) for authentication and authorization */
const jsonwebtoken = require("jsonwebtoken")

/************************************************* Internal libraries *************************************************/
const { authService } = require("./authService.js")
const { statusCodes } = require("../constants/statusCodes.js")

/* Controller of the 'authentication and authorization' requests and responses handling */
const authController = {
  login: async (req, res) => {
    try {
      const loggedUser = await authService.login(res.locals.loginData)
      if (!loggedUser) {
        return res.status(statusCodes.Forbidden)
        .send({ error: "Las credenciales de inicio de sesión no son correctas. Por favor, inténtelo de nuevo con los datos correctos." })

      }
      else {
        /* Valid user, generate token */
        const token = jsonwebtoken.sign(
          { id: loggedUser._id, role: loggedUser.role },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_DEFAULT_EXPIRATION }
        )
        const successText = `User (${loggedUser.role}) logged in successfully!`
        logger.debug(successText)
        res.status(statusCodes.OK)
          .send({ msg: successText, data: token })
      }
    } catch (error) {
      const errorText = "User could not be logged in!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
}

/*************************************************** Module export ****************************************************/
module.exports = { authController }
