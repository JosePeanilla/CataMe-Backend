require("dotenv").config()  /* Node module used to load environment variables from a .env file into process.env */

/* Internal logger */
const { Logger } = require("./utils/Logger.js")
const logger = new Logger(__filename)

const express = require("express")  /* Node module used to create an ExpressJS application */
const cors = require("cors")  /* Node module used to permit CORS (Cross-Origin Resource Sharing) */

/* ExpressJS application object */
const app = express()
const port = process.env.PORT || 3000

const { dbConnection } = require("./data/dbConnection.js")  /* Import the database connection configuration ... */
dbConnection()  /* ... and connect to the (MongoDB) database */

/* Common Middlewares (to be executed at the very beggining of all endpoints) */
app.use(cors())  /* Enable CORS for all requests */
app.use(express.json())  /* Parse the incoming requests/responses in JSON payloads */

/* Routes */
const { usersRouter } = require("./users/usersRouter.js")
const { authRouter } = require("./auth/authRouter.js")
app.use("/users", usersRouter)

// It is used to configure all the routes related to authentication (such as login or user registration) and specify that they do not require prior authentication to access them.
app.use("/", authRouter);

// It is used to configure routes related to users (consumerUsers) and specify that these routes are protected by JWT authentication.
app.use("/users", usersRouter);

/* Error-Handling Middlewares */
const { statusCodes } = require("./constants/statusCodes.js")
/* Route Not Found Error */
app.use((req, res) => {
  logger.error(`Not found route: [${req.method}] ${req.originalUrl}`)
  res.status(statusCodes.NotFound)
    .send({ type: "error", msg: `[ERROR] Route could not be found! ([${req.method}] ${req.originalUrl})` })
})
/* Uncontrolled Error */
app.use((err, req, res, next) => {
  logger.error("Uncontrolled internal error:", err)
  res.status(statusCodes.InternalServerError)
    .send({ type: "error", msg: `[ERROR] Some uncontrolled internal error happened! (${err.message})` })
})

/* Express (HTTP) server listening for incoming requests */
const server = app.listen(port, (error) => {
  if (error) {
    logger.error("The Express server couldn't get started!\n", error)
    return
  }
  /* The ExpressJS application is running, and ... */
  logger.debug(`The HTTP server is listening for incoming requests on: http://localhost:${port}`)
})
