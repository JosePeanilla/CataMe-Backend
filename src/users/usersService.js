/************************************************* Internal libraries *************************************************/
/* Model of 'consumer users' entity */
const { ConsumerModel } = require("./consumers/ConsumerModel.js")
/* Model of 'winery users' entity */
const { WineryModel } = require("./wineries/WineryModel.js")

/* Service which interacts with the 'user' database */
const usersService = {
  getAllUsers: async () => {
    return {
      consumers: await ConsumerModel.find(),
      wineries: await WineryModel.find()
    }
  },
  getLoggedUser: async (loggedUserToken) => {
    try {
      const { id, role } = loggedUserToken
      let userModel = null
      switch (role) {
        case "consumers":
          userModel = ConsumerModel
          break
        case "wineries":
          userModel = WineryModel
          break
        default:
          break
      }
      if (!userModel) {
        throw new Error(`Unkonwn '${role}' role for a user with '${id}' ID!`)
      }
      const loggedUser = userModel.findById(id)
      if (!loggedUser) {
        throw new Error(`Database returned '${loggedUser}' when trying to get a user with '${id}' ID!`)
      }
      return loggedUser
    } catch (error) {
      throw error
    }
  }
}

/*************************************************** Module export ****************************************************/
module.exports = { usersService }
