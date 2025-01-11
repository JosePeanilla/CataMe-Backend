const { ConsumerUserModel } = require("./consumerUsers/ConsumerUserModel.js")  /* Model of 'consumer users' entity */

/* Service which interacts with the 'user' database */
const usersService = {
  getAllUsers: async () => {
    const allConsumerUsers = await ConsumerUserModel.find()
    return { consumerUsers: allConsumerUsers }
  }
}

module.exports = { usersService }
