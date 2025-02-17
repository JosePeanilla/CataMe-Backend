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
        if (updatedConsumer) return updatedConsumer
        else throw new Error(`Database returned '${updatedConsumer}' when trying to update a Consumer user with '${id}' ID!`)
        
    } catch (error) {
        throw error
    }
},

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
            throw new Error(`Database returned '${updatedConsumer}' when trying to update a Consumer user '${field_name}' field with '${id}' ID!`)
        }
        return updatedConsumer;
    } catch (error) {
        throw error
    }
  },
}

/*************************************************** Module export ****************************************************/
module.exports = { consumersService }
