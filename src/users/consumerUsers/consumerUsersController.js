/* Internal logger */
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)
const jwt = require("jsonwebtoken");


const { statusCodes } = require("../../constants/statusCodes.js")
const { consumerUsersService } = require("./consumerUsersService.js")

/* Controller of the 'consumer users' requests and responses handling */
const consumerUsersController = {
  createConsumerUser: async (req, res) => {
    try {
      const newConsumerUser = await consumerUsersService.createConsumerUser(res.locals.providedConsumerUserArgs)
      
      const token = jwt.sign(
        { id: newConsumerUser._id, email: newConsumerUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(statusCodes.Created)
        .send({ msg: "Consumer user created successfully!", ID: newConsumerUser._id, token })
    } catch (error) {
      logger.error("Consumer user could not be created!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: error.message })
    }
  },
  getAllConsumerUsers: async (req, res) => {
    const allConsumerUsers = await consumerUsersService.getAllConsumerUsers()
    res.status(statusCodes.OK)
      .send(allConsumerUsers)
  }
}

module.exports = { consumerUsersController }
