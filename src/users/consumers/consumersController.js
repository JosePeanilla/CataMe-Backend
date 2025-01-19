/* Internal logger */
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)
const { statusCodes } = require("../../constants/statusCodes.js")

const { consumersService } = require("./consumersService.js")

/* Controller of the 'consumer users' requests and responses handling */
const consumersController = {
  createConsumer: async (req, res) => {
    try {
      const newConsumer = await consumersService.createConsumer(res.locals.providedConsumerArgs)
      res.status(statusCodes.Created)
        .send({ msg: "Consumer user created successfully!", ID: newConsumer._id })
    } catch (error) {
      logger.error("Consumer user could not be created!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  },
  deleteConsumer: async (req, res) => {
    try {
      const deletedConsumer = await consumersService.deleteConsumer({ id: res.locals.matchingConsumer.id })
      res.status(statusCodes.OK)
        .send({ msg: "Consumer user deleted successfully!", ID: deletedConsumer._id })
    } catch (error) {
      logger.error("Consumer user could not be deleted!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  },
  getAllConsumers: async (req, res) => {
    const allConsumers = await consumersService.getAllConsumers()
    res.status(statusCodes.OK)
      .send(allConsumers)
  },
  getConsumerDetails: async (req, res) => {
    res.status(statusCodes.OK)
      .send(res.locals.matchingConsumer)
  },
  updateConsumer: async (req, res) => {
    try {
      const updatedConsumer = await consumersService.updateConsumer({
        id: req.params.id,
        ...res.locals.providedConsumerArgs
      })
      res.status(statusCodes.OK)
        .send({ msg: "Consumer user updated successfully!", ID: updatedConsumer._id })
    } catch (error) {
      logger.error("Consumer user could not be updated!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  },
  updateConsumerField: async (req, res) => {
    try {
      const updatedConsumer = await consumersService.updateConsumerField({
        id: req.params.id,
        field_name: req.params.field,
        field_value: req.body[req.params.field]
      })
      res.status(statusCodes.OK)
        .send({ msg: "Consumer user field updated successfully!", ID: updatedConsumer._id })
    } catch (error) {
      logger.error("Consumer user field could not be updated!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  }
}

module.exports = { consumersController }
