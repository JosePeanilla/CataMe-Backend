const { ConsumerUserModel } = require("./ConsumerUserModel.js")  /* Model of 'consumer users' entity */

/* Service which interacts with the 'consumer user' database */
const consumerUsersService = {
  createConsumerUser: async (providedConsumerUserArgs) => {
    try {
      const newConsumerUser = await ConsumerUserModel.create(providedConsumerUserArgs)
      if (newConsumerUser) return newConsumerUser
      else throw new Error(`Database returned '${newConsumerUser}' when trying to create a Consumer user with provided args!`)
    } catch (error) {
      throw error
    }
  },
  deleteUser: async ({ id }) => {
    try {
      const deletedConsumerUser = await ConsumerUserModel.findByIdAndDelete(id)
      if (deletedConsumerUser) return deletedConsumerUser
      else throw new Error(`Database returned '${deletedConsumerUser}' when trying to delete a Consumer user with '${id}' ID!`)
    } catch (error) {
      throw error
    }
  },
  getAllConsumerUsers: async () => {
    return await ConsumerUserModel.find()
  },
  updateConsumerUser: async ({ id, ...userArgs }) => {
    try {
      const updatedConsumerUser = await ConsumerUserModel.findByIdAndUpdate(id, userArgs, { new: true })
      if (updatedConsumerUser) return updatedConsumerUser
      else throw new Error(`Database returned '${updatedConsumerUser}' when trying to update a Consumer user with '${id}' ID!`)
    } catch (error) {
      throw error
    }
  },
  updateConsumerUserField: async ({ id, field_name, field_value }) => {
    try {
      const updatedConsumerUser = await ConsumerUserModel.findByIdAndUpdate(id, { [field_name]: field_value }, { new: true })
      if (updatedConsumerUser) return updatedConsumerUser
      else throw new Error(`Database returned '${updatedConsumerUser}' when trying to update a Consumer user '${field_name}' field with '${id}' ID!`)
    } catch (error) {
      throw error
    }
  }
}

module.exports = { consumerUsersService }
