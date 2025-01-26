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

const logRoute = (req, res, next) => {  /* Log the route (useful for debugging purposes) */
  logger.debug(
    `Received request route: ${req.method} ${req.originalUrl}`,
    " - Body:", req.body,
    "\n  - Params:", req.params,
    "\n  - Query:", req.query)
  next()
}
// app.use(logRoute)

/* Routes */
const { usersRouter } = require("./users/usersRouter.js")
app.use("/users", usersRouter)

/* Error-Handling Middlewares */
const { statusCodes } = require("./constants/statusCodes.js")
/* Route Not Found Error */
app.use((req, res) => {
  const errorText = `Route '[${req.method}] ${req.originalUrl}' could not be found!`
  logger.error(errorText)
  res.status(statusCodes.NotFound)
    .send({ error: errorText })
})
/* Uncontrolled Error */
app.use((err, req, res, next) => {
  const errorText = "Some uncontrolled internal error happened!"
  logger.error(errorText, err)
  res.status(statusCodes.InternalServerError)
    .send({ msg: errorText, error: err.message })
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
