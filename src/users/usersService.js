const { UserModel } = require("./UserModel.js")  /* Model of 'users' entity */

/* Service which interacts with the 'user' database */
const usersService = {
  getAllUsers: async () => {
    const allUsers = await UserModel.find()
    return allUsers
  }
}

module.exports = { usersService }
