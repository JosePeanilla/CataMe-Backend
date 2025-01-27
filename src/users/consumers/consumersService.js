/************************************************* Internal libraries *************************************************/
/* Model of 'consumer users' entity */
const { ConsumerModel } = require("./ConsumerModel.js")

/* Service which interacts with the 'consumer user' database */
const consumersService = {
  createConsumer: async (providedConsumerArgs) => {
    try {
      const newConsumer = await ConsumerModel.create(providedConsumerArgs)
      if (newConsumer) return newConsumer
      else throw new Error(`Database returned '${newConsumer}' when trying to create a Consumer user with provided args!`)
    } catch (error) {
      throw error
    }
  },
  deleteConsumer: async ({ id }) => {
    try {
      const deletedConsumer = await ConsumerModel.findByIdAndDelete(id)
      if (deletedConsumer) return deletedConsumer
      else throw new Error(`Database returned '${deletedConsumer}' when trying to delete a Consumer user with '${id}' ID!`)
    } catch (error) {
      throw error
    }
  },
  getAllConsumers: async () => {
    return await ConsumerModel.find()
  },
  updateConsumer: async ({ id, ...consumerArgs }) => {
    try {
      const updatedConsumer = await ConsumerModel.findByIdAndUpdate(id, consumerArgs, { new: true })
      if (updatedConsumer) return updatedConsumer
      else throw new Error(`Database returned '${updatedConsumer}' when trying to update a Consumer user with '${id}' ID!`)
    } catch (error) {
      throw error
    }
  },
  updateConsumerField: async ({ id, field_name, field_value }) => {
    try {
      const updatedConsumer = await ConsumerModel.findByIdAndUpdate(id, { [field_name]: field_value }, { new: true })
      if (updatedConsumer) return updatedConsumer
      else throw new Error(`Database returned '${updatedConsumer}' when trying to update a Consumer user '${field_name}' field with '${id}' ID!`)
    } catch (error) {
      throw error
    }
  }
}

/*************************************************** Module export ****************************************************/
module.exports = { consumersService }
