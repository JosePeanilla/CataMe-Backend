const express = require("express")  /* Node module used to create an ExpressJS router */
const usersRouter = express.Router()  /* ExpressJS router object */

/* Place here Middlewares */

/* Endpoints */
const { usersController } = require("./usersController.js")

/* /users/ */
usersRouter.get('/', usersController.getAllUsers)

/* Sub-Routes */
const { consumersRouter } = require("./consumers/consumersRouter.js")
usersRouter.use("/consumers", consumersRouter)
const { wineriesRouter } = require("./wineries/wineriesRouter.js")
usersRouter.use("/wineries", wineriesRouter)

module.exports = { usersRouter }
