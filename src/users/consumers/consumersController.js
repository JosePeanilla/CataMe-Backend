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
      const successText = "Consumer user created successfully!"
      logger.debug(successText)
      res.status(statusCodes.Created)
        .send({ msg: successText, data: newConsumer._id })
    } catch (error) {
      const errorText = "Consumer user could not be created!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  deleteConsumer: async (req, res) => {
    try {
      const deletedConsumer = await consumersService.deleteConsumer({ id: res.locals.matchingConsumer.id })
      const successText = "Consumer user deleted successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: deletedConsumer._id })
    } catch (error) {
      const errorText = "Consumer user could not be deleted!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  getAllConsumers: async (req, res) => {
    try {
      const allConsumers = await consumersService.getAllConsumers()
      const successText = "ALL consumer users retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: allConsumers })
    } catch (error) {
      const errorText = "ALL consumer users could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  getConsumerDetails: async (req, res) => {
    try {
      const successText = "Information regarding consumer user retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: res.locals.matchingConsumer })
    } catch (error) {
      const errorText = "Information regarding consumer user could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  updateConsumer: async (req, res) => {
    try {
      const updatedConsumer = await consumersService.updateConsumer({
        id: req.params.id,
        ...res.locals.providedConsumerArgs
      })
      const successText = "Consumer user updated successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: updatedConsumer._id })
    } catch (error) {
      const errorText = "Consumer user could not be updated!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  updateConsumerField: async (req, res) => {
    try {
      const updatedConsumer = await consumersService.updateConsumerField({
        id: req.params.id,
        field_name: req.params.field,
        field_value: req.body[req.params.field]
      })
      const successText = "Consumer user field updated successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: updatedConsumer._id })
    } catch (error) {
      const errorText = "Consumer user field could not be updated!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  }
}

module.exports = { consumersController }
