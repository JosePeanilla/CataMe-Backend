/************************************************ Node modules needed *************************************************/
/* Used to create an ExpressJS router */
const express = require("express")

/********************************************** ExpressJS router object ***********************************************/
const usersRouter = express.Router()

/**************************************************** Middlewares *****************************************************/
const { checkAllLoginCredentialsAreProvided } = require("../auth/authMiddlewares.js")

/***************************************************** Sub-Routes *****************************************************/
const { consumersRouter } = require("./consumers/consumersRouter.js")
const { wineriesRouter } = require("./wineries/wineriesRouter.js")
usersRouter.use("/consumers", consumersRouter)
usersRouter.use("/wineries", wineriesRouter)

/***************************************************** Endpoints ******************************************************/
const { authController } = require("../auth/authController.js")
const { usersController } = require("./usersController.js")

/* /users/ */
usersRouter.get('/', usersController.getAllUsers)

/* /users/login/ */
usersRouter.post("/login",
  checkAllLoginCredentialsAreProvided,
  authController.login
)

/*************************************************** Module export ****************************************************/
module.exports = { usersRouter }
