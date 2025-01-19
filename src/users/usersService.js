const { ConsumerUserModel } = require("./consumerUsers/ConsumerUserModel.js")  /* Model of 'consumer users' entity */

/* Service which interacts with the 'user' database */
const usersService = {
  getAllUsers: async () => {
    return { consumers: await ConsumerUserModel.find() }
  }
}

module.exports = { usersService }
