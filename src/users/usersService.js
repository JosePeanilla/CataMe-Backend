const { ConsumerModel } = require("./consumers/ConsumerModel.js")  /* Model of 'consumer users' entity */

/* Service which interacts with the 'user' database */
const usersService = {
  getAllUsers: async () => {
    return { consumers: await ConsumerModel.find() }
  }
}

module.exports = { usersService }
