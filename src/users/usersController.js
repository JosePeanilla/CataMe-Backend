/************************************************** Internal Logger *****************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries ***************************************************/
const { statusCodes } = require("../constants/statusCodes.js")
const { usersService } = require("./usersService.js")

/*************************************** Users Controller: Route Handlers ***********************************************/
/**
 * Handles incoming requests related to user data, including fetching all users
 * and retrieving the currently authenticated user based on token data.
 */

const usersController = {
  /**
   * GET /users
   * Retrieve all users (both consumers and wineries)
   */
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await usersService.getAllUsers()
      const successText = "ALL users retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).send({ msg: successText, data: allUsers })
    } catch (error) {
      const errorText = "ALL users could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).send({ msg: errorText, error: error.message })
    }
  },

  /**
   * GET /user
   * Retrieve the logged-in user based on the token (from middleware)
   */
  getLoggedUser: async (req, res) => {
    try {
      const loggedUser = await usersService.getLoggedUser(res.locals.loggedUserToken)
      const successText = "Logged user retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).send({ msg: successText, data: loggedUser })
    } catch (error) {
      const errorText = "Logged user could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).send({ msg: errorText, error: error.message })
    }
  }
}

/*************************************************** Module Export ******************************************************/
module.exports = { usersController }
