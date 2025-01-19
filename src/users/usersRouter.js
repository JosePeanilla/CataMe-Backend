const express = require("express")  /* Node module used to create an ExpressJS router */
const usersRouter = express.Router()  /* ExpressJS router object */

/* Place here Middlewares */

/* Sub-Routes */
const { consumerUsersRouter } = require("./consumerUsers/consumerUsersRouter.js")
usersRouter.use("/consumers", consumerUsersRouter)

/* Endpoints */
const { usersController } = require("./usersController.js")
usersRouter.get('/', usersController.getAllUsers)

module.exports = { usersRouter }
