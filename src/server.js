/*********************************************************************************************
 * Main server entry point: Sets up Express app, routes, middlewares, error handling,
 * and starts the HTTP server (with Socket.io and MongoDB connection).
 *********************************************************************************************/

/********************************* Load environment variables from .env into process.env *********************************/
require("dotenv").config()

/***************************************************** Internal Modules ***************************************************/
const { Logger } = require("./utils/Logger.js")
const { checkProvidedTokenIsValid } = require("./auth/authMiddlewares.js")

/***************************************************** External Modules ***************************************************/
const cors = require("cors")
const express = require("express")
const http = require("http") // Required to create the HTTP server

/********************************************* Create ExpressJS application object *****************************************/
const app = express()
const port = process.env.PORT || 3000

/*********************************************** Global Middlewares *******************************************************/
/* Enable CORS (Cross-Origin Resource Sharing) */
app.use(cors())

/* Automatically parse JSON payloads from incoming requests */
app.use(express.json())

/******************************** Root Endpoint to check server is up and running ******************************************/
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Wine API" })
})

/********************************************** Route Logging Middleware ***************************************************/
/* Logs useful information about each incoming request */
const logger = new Logger(__filename)
const logRoute = (req, res, next) => {
  logger.debug(
    `Received request route: ${req.method} ${req.originalUrl}
    - Authorization: ${req.headers.authorization}
    - Body: ${JSON.stringify(req.body)}
    - Params: ${JSON.stringify(req.params)}
    - Query: ${JSON.stringify(req.query)}`
  )
  next()
}
app.use(logRoute)

/******************************************************* Routers **********************************************************/
const { usersRouter } = require("./users/usersRouter.js")
app.use("/users", usersRouter)

const { wineriesRouter } = require("./users/wineries/wineriesRouter.js")
app.use("/wineries", wineriesRouter)

const { winesRouter } = require("./wines/winesRouter.js")
app.use("/wines", winesRouter)

const { regionsRouter } = require("./regions/regionsRouter.js")
app.use("/regions", regionsRouter)

const { reviewsRouter } = require("./reviews/reviewsRouter.js") 
app.use("/reviews", reviewsRouter)

const { authRouter } = require("./auth/authRouter.js")
app.use("/auth", authRouter)

/*********************************************** Protected Endpoints ******************************************************/
/* Get current user data from token */
const { usersController } = require("./users/usersController.js")
app.get("/user", checkProvidedTokenIsValid, usersController.getLoggedUser)

/* Ignore favicon.ico requests to avoid 404 log noise */
app.get("/favicon.ico", (req, res) => res.status(204).end())

/********************************************* Error Handling Middlewares *************************************************/
/* Handle 404 - Route Not Found */
const { statusCodes } = require("./constants/statusCodes.js")
app.use((req, res) => {
  const errorText = `Route '[${req.method}] ${req.originalUrl}' could not be found!`
  logger.error(errorText)
  res.status(statusCodes.NotFound).send({ error: errorText })
})

/* Handle 500 - Uncaught Internal Errors */
app.use((err, req, res, next) => {
  const errorText = "Some uncontrolled internal error happened!"
  logger.error(errorText, err)
  res.status(statusCodes.InternalServerError).send({ msg: errorText, error: err.message })
})

/***************************************************** WebSockets *********************************************************/
/* Create HTTP server and initialize Socket.io */
const server = http.createServer(app)
const { initializeSocket } = require("./socket/socket.js")
initializeSocket(server)

/**************************************************** Start Server ********************************************************/
const startServer = async () => {
  try {
    /* Connect to the database before starting the server */
    const { dbConnection } = require("./data/dbConnection.js")
    await dbConnection()

    /* Start HTTP server and listen on configured port */
    server.listen(port, (error) => {
      if (error) {
        logger.error("The Express server couldn't get started!", error)
        return null
      }
      logger.info(`The HTTP server is listening for incoming requests on: http://localhost:${port}`)
    })

    return server
  } catch (error) {
    logger.error("It could not be connected to the database!", error)
    return null
  }
}
startServer()
