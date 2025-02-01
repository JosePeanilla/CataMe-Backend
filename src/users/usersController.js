/************************************************** Internal logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal libraries *************************************************/
const { statusCodes } = require("../constants/statusCodes.js")
const { usersService } = require("./usersService.js")

/* Controller of the 'users' requests and responses handling */
const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await usersService.getAllUsers()
      const successText = "ALL users retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: allUsers })
    } catch (error) {
      const errorText = "ALL users could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  getLoggedUser: async (req, res) => {
    try {
      const loggedUser = await usersService.getLoggedUser(res.locals.loggedUserToken)
      const successText = "Logged user retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: loggedUser })
    } catch (error) {
      const errorText = "Logged user could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  }
}

/*************************************************** Module export ****************************************************/
module.exports = { usersController }
