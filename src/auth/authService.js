/************************************************** Internal logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal libraries *************************************************/
/* Model of 'consumer users' entity */
const { ConsumerModel } = require("../users/consumers/ConsumerModel.js")
/* Model of 'winery users' entity */
const { WineryModel } = require("../users/wineries/WineryModel.js")

const authService = {
  login: async ({ email, password }) => {
    try {
      /* Get the user (among the different user models) that matches the provided email, if any */
      let loggedUser = null
      for (userModel of [ConsumerModel, WineryModel]){
        loggedUser = await userModel.findOne({ email })
        if (loggedUser) break
      }

      /* Check if it exists a user with provided email and password */
      if (!loggedUser || loggedUser.password !== password) {
        logger.error("Invalid email or password!")
        return null
      }

      /* Check if the logged user is verified */
      if (!loggedUser.is_verified) {
        logger.error("User not verified!")
        return null
      }

      /* Returns the user as it is valid and active */
      return loggedUser
    } catch (error) {
      throw error
    }
  }
}

/*************************************************** Module export ****************************************************/
module.exports = { authService }
