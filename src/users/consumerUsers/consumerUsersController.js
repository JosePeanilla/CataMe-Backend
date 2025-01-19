/* Internal logger */
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)
const { statusCodes } = require("../../constants/statusCodes.js")

const { consumerUsersService } = require("./consumerUsersService.js")

/* Controller of the 'consumer users' requests and responses handling */
const consumerUsersController = {
  createConsumerUser: async (req, res) => {
    try {
      const newConsumerUser = await consumerUsersService.createConsumerUser(res.locals.providedConsumerUserArgs)
      res.status(statusCodes.Created)
        .send({ msg: "Consumer user created successfully!", ID: newConsumerUser._id })
    } catch (error) {
      logger.error("Consumer user could not be created!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  },
  deleteConsumerUser: async (req, res) => {
    try {
      const deletedConsumerUser = await consumerUsersService.deleteUser({ id: res.locals.matchingConsumerUser.id })
      res.status(statusCodes.OK)
        .send({ msg: "Consumer user deleted successfully!", ID: deletedConsumerUser._id })
    } catch (error) {
      logger.error("Consumer user could not be deleted!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  },
  getAllConsumerUsers: async (req, res) => {
    const allConsumerUsers = await consumerUsersService.getAllConsumerUsers()
    res.status(statusCodes.OK)
      .send(allConsumerUsers)
  },
  getConsumerUserDetails: async (req, res) => {
    res.status(statusCodes.OK)
      .send(res.locals.matchingConsumerUser)
  },
  updateConsumerUser: async (req, res) => {
    try {
      const updatedConsumerUser = await consumerUsersService.updateConsumerUser({
        id: req.params.id,
        ...res.locals.providedConsumerUserArgs
      })
      res.status(statusCodes.OK)
        .send({ msg: "Consumer user updated successfully!", ID: updatedConsumerUser._id })
    } catch (error) {
      logger.error("Consumer user could not be updated!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  },
  updateConsumerUserField: async (req, res) => {
    try {
      const updatedConsumerUser = await consumerUsersService.updateConsumerUserField({
        id: req.params.id,
        field_name: req.params.field,
        field_value: req.body[req.params.field]
      })
      res.status(statusCodes.OK)
        .send({ msg: "Consumer user field updated successfully!", ID: updatedConsumerUser._id })
    } catch (error) {
      logger.error("Consumer user field could not be updated!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  }
}

module.exports = { consumerUsersController }
