/*********************************************** Node Modules Needed ****************************************************/
/* Used to create an ExpressJS router */
const express = require("express")

/************************************************ Logger Setup **********************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/********************************************* ExpressJS Router Object **************************************************/
const usersRouter = express.Router()

/**************************************************** Middlewares *******************************************************/
/* Validate login credentials (email & password) */
const { checkAllLoginCredentialsAreProvided } = require("../auth/authMiddlewares.js")

/**************************************************** Sub-Routes ********************************************************/
/* Mount sub-routes for consumer and winery users */
const { consumersRouter } = require("./consumers/consumersRouter.js")
const { wineriesRouter } = require("./wineries/wineriesRouter.js")

usersRouter.use("/consumers", (req, res, next) => {
  logger.info("Routing request to /users/consumers")
  next()
}, consumersRouter)

usersRouter.use("/wineries", (req, res, next) => {
  logger.info("Routing request to /users/wineries")
  next()
}, wineriesRouter)

/****************************************************** Endpoints *******************************************************/
const { authController } = require("../auth/authController.js")
const { usersController } = require("./usersController.js")

/**
 * GET /users
 * Get all users (consumers and wineries)
 */
usersRouter.get("/", (req, res, next) => {
  logger.info("GET /users - Fetching all users")
  usersController.getAllUsers(req, res, next)
})

/**
 * POST /users/login
 * Handle user login (consumers or wineries)
 */
usersRouter.post("/login",
  checkAllLoginCredentialsAreProvided,
  (req, res, next) => {
    logger.info("POST /users/login - Attempting login")
    authController.login(req, res, next)
  }
)

/*************************************************** Module Export ******************************************************/
module.exports = { usersRouter }
