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
  getAllConsumerUsers: async () => {
    const allConsumerUsers = await ConsumerUserModel.find()
    return allConsumerUsers
  }
}

module.exports = { consumerUsersService }
