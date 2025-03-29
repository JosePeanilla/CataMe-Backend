/************************************************** Internal Logger *****************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries ***************************************************/
/* Model of 'consumer users' entity */
const { ConsumerModel } = require("./ConsumerModel.js")

/************************************** Consumers Service: Business Logic Layer *****************************************/
/**
 * Handles database operations related to consumer users:
 * creation, retrieval, update, and deletion.
 */

const consumersService = {
  /**
   * Create a new consumer user
   */
  createConsumer: async (providedConsumerArgs) => {
    try {
      const existingConsumer = await ConsumerModel.findOne({ email: providedConsumerArgs.email })

      if (existingConsumer) {
        throw new Error("The user you are trying to register is already registered in the database.")
      }

      const newConsumer = await ConsumerModel.create(providedConsumerArgs)

      if (!newConsumer) {
        throw new Error("Database returned null when creating consumer.")
      }

      logger.info(`Consumer created with ID: ${newConsumer._id}`)
      return newConsumer
    } catch (error) {
      logger.error("Error creating consumer:", error)
      throw error
    }
  },

  /**
   * Delete a consumer user by ID
   */
  deleteConsumer: async ({ id }) => {
    try {
      const deletedConsumer = await ConsumerModel.findByIdAndDelete(id)

      if (!deletedConsumer) {
        throw new Error(`No consumer found to delete with ID '${id}'`)
      }

      logger.info(`Consumer deleted with ID: ${id}`)
      return deletedConsumer
    } catch (error) {
      logger.error("Error deleting consumer:", error)
      throw error
    }
  },

  /**
   * Retrieve all consumer users
   */
  getAllConsumers: async () => {
    logger.info("Fetching all consumer users")
    return await ConsumerModel.find()
  },

  /**
   * Get a specific consumer user by ID
   */
  getConsumerById: async (id) => {
    try {
      const consumer = await ConsumerModel.findById(id)

      if (!consumer) {
        throw new Error(`Consumer user with ID '${id}' could not be found!`)
      }

      logger.info(`Consumer retrieved with ID: ${id}`)
      return consumer
    } catch (error) {
      logger.error("Error retrieving consumer:", error)
      throw error
    }
  },

  /**
   * Update full consumer profile
   */
  updateConsumer: async ({ id, ...consumerArgs }) => {
    try {
      const currentConsumer = await ConsumerModel.findById(id)

      if (!currentConsumer) {
        throw new Error(`Consumer user with ID '${id}' could not be found!`)
      }

      const isSameData = Object.keys(consumerArgs).every(
        (key) => currentConsumer[key] === consumerArgs[key]
      )

      if (isSameData) {
        throw new Error("No changes detected, update operation skipped.")
      }

      const updatedConsumer = await ConsumerModel.findByIdAndUpdate(id, consumerArgs, { new: true })

      if (!updatedConsumer) {
        throw new Error(`Database returned null when trying to update Consumer with ID '${id}'`)
      }

      logger.info(`Consumer updated with ID: ${id}`)
      return updatedConsumer
    } catch (error) {
      logger.error("Error updating consumer:", error)
      throw error
    }
  },

  /**
   * Update a single field for a consumer user
   */
  updateConsumerField: async ({ id, field_name, field_value }) => {
    try {
      if (!field_value) {
        throw new Error(`Field value for '${field_name}' is undefined!`)
      }

      const existingConsumer = await ConsumerModel.findById(id)

      if (!existingConsumer) {
        throw new Error(`User with ID '${id}' does not exist in the database.`)
      }

      if (existingConsumer[field_name] === field_value) {
        throw new Error(`Cannot update field '${field_name}' because the value is the same.`)
      }

      logger.debug(`Updating ID: ${id}, Field: ${field_name}, Value: ${field_value}`)

      const updatedConsumer = await ConsumerModel.findByIdAndUpdate(
        id,
        { [field_name]: field_value },
        { new: true }
      )

      if (!updatedConsumer) {
        throw new Error(`Update failed for field '${field_name}' of consumer with ID '${id}'`)
      }

      logger.info(`Field '${field_name}' updated for consumer ID: ${id}`)
      return updatedConsumer
    } catch (error) {
      logger.error("Error updating consumer field:", error)
      throw error
    }
  },
}

/*************************************************** Module Export ******************************************************/
module.exports = { consumersService }
