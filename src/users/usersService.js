/*********************************************** Internal Libraries ******************************************************/
/* Model of 'consumer users' entity */
const { ConsumerModel } = require("./consumers/ConsumerModel.js")
/* Model of 'winery users' entity */
const { WineryModel } = require("./wineries/WineryModel.js")

/******************************************************** Logger *********************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/*************************************** User Service: Business Logic Layer **********************************************/
/**
 * This service provides database access related to users (both consumers and wineries).
 * It supports listing all users and retrieving the currently logged-in user based on role and ID.
 */

const usersService = {
  /**
   * Get all users (both consumers and wineries)
   */
  getAllUsers: async () => {
    logger.info("Fetching all users: consumers and wineries")
    return {
      consumers: await ConsumerModel.find(),
      wineries: await WineryModel.find()
    }
  },

  /**
   * Get the currently logged-in user using data from token
   */
  getLoggedUser: async (loggedUserToken) => {
    try {
      const { id, role } = loggedUserToken
      logger.info(`Getting logged user with ID: ${id} and role: ${role}`)

      let userModel = null
      switch (role) {
        case "consumers":
          userModel = ConsumerModel
          break
        case "wineries":
          userModel = WineryModel
          break
        default:
          const errorText = `Unknown '${role}' role for a user with ID '${id}'`
          logger.error(errorText)
          throw new Error(errorText)
      }

      const loggedUser = await userModel.findById(id) // ⚠️ Aquí faltaba el `await`

      if (!loggedUser) {
        const errorText = `User not found in DB with ID '${id}'`
        logger.warn(errorText)
        throw new Error(errorText)
      }

      logger.info(`User with ID '${id}' retrieved successfully`)
      return loggedUser
    } catch (error) {
      logger.error("Error retrieving logged user:", error)
      throw error
    }
  }
}

/*************************************************** Module Export ******************************************************/
module.exports = { usersService }
