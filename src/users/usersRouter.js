const express = require("express")  /* Node module used to create an ExpressJS router */
const usersRouter = express.Router()  /* ExpressJS router object */

/* Place here Middlewares */

/* Endpoints */
const { usersController } = require("./usersController.js")

/* /users/ */
usersRouter.get('/', usersController.getAllUsers)

/* Sub-Routes */
const { consumerUsersRouter } = require("./consumerUsers/consumerUsersRouter.js")
usersRouter.use("/consumers", consumerUsersRouter)

module.exports = { usersRouter }
