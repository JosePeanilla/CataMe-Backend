const express = require("express")  /* Node module used to create an ExpressJS router */
const consumerUsersRouter = express.Router()  /* ExpressJS router object */

/* Middlewares */
const {
  checkRequiredArgsAreProvided,
} = require("./consumerUsersMiddlewares.js")

/* Endpoints */
const { consumerUsersController } = require("./consumerUsersController.js")
consumerUsersRouter.post('/',
  checkRequiredArgsAreProvided,
  consumerUsersController.createConsumerUser
)

module.exports = { consumerUsersRouter }
