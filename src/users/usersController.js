/* Internal logger */
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)
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
  }
}

module.exports = { usersController }
