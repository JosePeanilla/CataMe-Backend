/************************************************** Internal logger ***************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)
/************************************************* Internal libraries *************************************************/
/* Model of 'consumer users' entity */
const { ConsumerModel } = require("./ConsumerModel.js")

/* Service which interacts with the 'consumer user' database */
const consumersService = {
  createConsumer: async (providedConsumerArgs) => {
    try {
      const newConsumer = await ConsumerModel.create(providedConsumerArgs)
      if (newConsumer) return newConsumer
      else throw `Database returned '${newConsumer}' when trying to create a Consumer user with provided args!`
    } catch (error) {
      throw error
    }
  },
  deleteConsumer: async ({ id }) => {
    try {
      const deletedConsumer = await ConsumerModel.findByIdAndDelete(id)
      if (deletedConsumer) return deletedConsumer
      else throw `Database returned '${deletedConsumer}' when trying to delete a Consumer user with '${id}' ID!`
    } catch (error) {
      throw error
    }
  },
  getAllConsumers: async () => {
    return await ConsumerModel.find()
  },
  
  getConsumerById: async (id) => {
    try {
      const consumer = await ConsumerModel.findById(id)
      if (!consumer) {
        throw `Consumer user with ID '${id}' could not be found!`
      }
      return consumer
    } catch (error) {
      throw error
    }
  },

  updateConsumer: async ({ id, ...consumerArgs }) => {
    try {
      const updatedConsumer = await ConsumerModel.findByIdAndUpdate(id, consumerArgs, { new: true })
      if (updatedConsumer) return updatedConsumer
      else throw `Database returned '${updatedConsumer}' when trying to update a Consumer user with '${id}' ID!`
    } catch (error) {
      throw error
    }
  },
  updateConsumerField: async ({ id, field_name, field_value }) => {
    try {
      if (!field_value) {
        throw new Error(`Field value for '${field_name}' is undefined!`);
      }
      logger.debug(`Updating ID: ${id}, Field: ${field_name}, Value: ${field_value}`)
      const updatedConsumer = await ConsumerModel.findByIdAndUpdate(
        id,
        { [field_name]: field_value },
        { new: true }
      )
      if (!updatedConsumer) {
        throw new Error(`Database returned '${updatedConsumer}' when trying to update a Consumer user '${field_name}' field with '${id}' ID!`)
      }
      return updatedConsumer
    } catch (error) {
      throw error
    }
  }
}

/*************************************************** Module export ****************************************************/
module.exports = { consumersService }
