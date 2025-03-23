/************************************************** Internal logger ***************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node modules needed *************************************************/
/* Manage JSON Web Tokens (JWT) for authentication and authorization */
const jsonwebtoken = require("jsonwebtoken")

/************************************************* Internal libraries *************************************************/
const { consumersService } = require("./consumersService.js")
const { statusCodes } = require("../../constants/statusCodes.js")
const { sendWelcomeEmail } = require("../../emailService/emailService.js") // ✅ Import email function

/* Controller of the 'consumer users' requests and responses handling */
const consumersController = {
  createConsumer: async (req, res) => {
    try {
      const newConsumer = await consumersService.createConsumer(res.locals.providedConsumerArgs)
      const successText = "Consumer user created successfully!"
      logger.debug(successText)

      // Sends welcome email after successful user creation
      sendWelcomeEmail(newConsumer.email, newConsumer.name)
        .then(() => logger.debug("✅ Welcome email sent successfully"))
        .catch(err => logger.error("❌ Failed to send email", err));

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
  getConsumer: async (req, res) => {
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
        const currentConsumer = await consumersService.getConsumerById(req.params.id)
        if (!currentConsumer) {
            return res.status(statusCodes.NotFound)
                .send({ msg: "Consumer user not found!", error: "Consumer user not found!" })
        }
        const isSameData = Object.keys(res.locals.providedConsumerArgs).every(
            (key) => currentConsumer[key] === res.locals.providedConsumerArgs[key]
        )
        if (isSameData) {
            return res.status(statusCodes.OK)
                .send({ msg: "No changes detected, update operation skipped." })
        }
        const updatedConsumer = await consumersService.updateConsumer({
            id: req.params.id,
            ...res.locals.providedConsumerArgs
        })
        const successText = "Consumer user updated successfully!"
        logger.debug(successText)
        res.status(statusCodes.OK).send({ msg: successText, data: updatedConsumer })
    } catch (error) {
        const errorText = "Consumer user could not be updated!"
        logger.error(errorText, error)
        res.status(statusCodes.InternalServerError)
            .send({ msg: errorText, error: error.message })
    }
  },

  updateConsumerField: async (req, res) => {
    try {
        const { id, field } = req.params
        const newValue = res.locals.new_value
        logger.debug(`Updating consumer field: ${field} with value: ${newValue}`)
        if (!newValue) {
            throw new Error(`New value for field '${field}' is undefined!`)
        }
        const existingConsumer = await consumersService.getConsumerById(id)
        if (!existingConsumer) {
            throw new Error(`User with ID '${id}' does not exist in the database.`)
        }
        if (existingConsumer[field] === newValue) {
            const errorText = `Cannot update field '${field}' because the value is the same.`
            logger.error(errorText)
            return res.status(statusCodes.BadRequest).send({ msg: errorText, error: errorText })
        }
        const updatedConsumer = await consumersService.updateConsumerField({
            id,
            field_name: field,
            field_value: newValue
        })
        if (!updatedConsumer) {
            throw new Error(`Database returned '${updatedConsumer}' when trying to update a Consumer user '${field}' field with '${id}' ID!`)
        }
        const successText = `El campo '${field}' ha sido actualizado correctamente.`
        logger.debug(successText)
        res.status(statusCodes.OK).send({ msg: successText, data: updatedConsumer })
      } catch (error) {
        const errorText = "Consumer user field could not be updated!"
        logger.error(errorText, error)
        res.status(statusCodes.InternalServerError).send({ msg: errorText, error: error.message })
    }
  },
}

/*************************************************** Module export ****************************************************/
module.exports = { consumersController }
