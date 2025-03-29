/************************************************** Internal Logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries *************************************************/
/* Model of 'consumer users' entity */
const { ConsumerModel } = require("../users/consumers/ConsumerModel.js")
/* Model of 'winery users' entity */
const { WineryModel } = require("../users/wineries/WineryModel.js")

/* Service that handles authentication logic */
const authService = {
  login: async ({ email, password }) => {
    try {
      let loggedUser = null

      for (const userModel of [ConsumerModel, WineryModel]) {
        loggedUser = await userModel.findOne({ email })
        if (loggedUser) break
      }

      if (!loggedUser) {
        logger.warn("Login failed: email not found")
        return { error: "not_found" }
      }

      if (loggedUser.password !== password) {
        logger.warn("Login failed: incorrect password")
        return { error: "invalid_password" }
      }

      if (!loggedUser.is_verified) {
        logger.warn("Login failed: user not verified")
        return { error: "not_verified" }
      }

      return { user: loggedUser }

    } catch (error) {
      logger.error("Login error", error)
      throw error
    }
  }
}

/*************************************************** Module export ****************************************************/
module.exports = { authService }
