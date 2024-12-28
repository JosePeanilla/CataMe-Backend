require("dotenv").config()  /* Node module used to load environment variables from a .env file into process.env */

/* Internal logger */
const { Logger } = require("./utils/Logger.js")
const logger = new Logger(__filename)

const express = require("express")  /* Node module used to create an ExpressJS application */
const cors = require("cors")  /* Node module used to permit CORS (Cross-Origin Resource Sharing) */

/* ExpressJS application object */
const app = express()
const port = process.env.PORT || 3000

/* Place here DB initialization */

/* Common Middlewares (to be executed at the very beggining of all endpoints) */
app.use(cors())  /* Enable CORS for all requests */
app.use(express.json())  /* Parse the incoming requests/responses in JSON payloads */

/* Place here the routes */

/* Place here the Error-Handling Middlewares */

/* Express (HTTP) server listening for incoming requests */
const server = app.listen(port, (error) => {
  if (error) {
    logger.error("The Express server couldn't get started!\n", error)
    return
  }
  /* The ExpressJS application is running, and ... */
  logger.debug(`The HTTP server is listening for incoming requests on: http://localhost:${port}`)
})
