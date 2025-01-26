const { ConsumerModel } = require("./consumers/ConsumerModel.js")  /* Model of 'consumer users' entity */
const { WineryModel } = require("./wineries/WineryModel.js")  /* Model of 'winery users' entity */

/* Service which interacts with the 'user' database */
const usersService = {
  getAllUsers: async () => {
    return {
      consumers: await ConsumerModel.find(),
      wineries: await WineryModel.find()
    }
  }
}

module.exports = { usersService }
