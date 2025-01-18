const { statusCodes } = require("../constants/statusCodes.js")
const { usersService } = require("./usersService.js")

/* Controller of the 'users' requests and responses handling */
const usersController = {
  getAllUsers: async (req, res) => {
    const allUsers = await usersService.getAllUsers()
    res.status(statusCodes.OK)
      .send(allUsers)
  }
}

module.exports = { usersController }
