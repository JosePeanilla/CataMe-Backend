/**************************** Load environment variables from a .env file into process.env ****************************/
require("dotenv").config();

/************************************************** Internal logger ***************************************************/
const { Logger } = require("./utils/Logger.js");
const logger = new Logger(__filename);

/************************************************ Node modules needed *************************************************/
/* Permit CORS (Cross-Origin Resource Sharing) */
const cors = require("cors");
/* Used to create an ExpressJS application */
const express = require("express");

/******************************************** ExpressJS application object ********************************************/
const app = express();
const port = process.env.PORT || 3000;

/********************* Common Middlewares (to be executed at the very beggining of all endpoints) **********************/
/* Enable CORS for all requests */
app.use(cors());
/* Parse the incoming requests/responses in JSON payloads */
app.use(express.json());
/* Log the route (useful for debugging purposes) */
const logRoute = (req, res, next) => {
  logger.debug(
    `Received request route: ${req.method} ${req.originalUrl}`,
    " - Authorization:",
    req.headers.authorization,
    "\n  - Body:",
    req.body,
    "\n  - Params:",
    req.params,
    "\n  - Query:",
    req.query
  );
  next();
};
// app.use(logRoute)

/**************************************************** Middlewares *****************************************************/
const { checkProvidedTokenIsValid } = require("./auth/authMiddlewares.js");

/******************************************************* Routes *******************************************************/
const { usersRouter } = require("./users/usersRouter.js");
app.use("/users", usersRouter);

/***************************************************** Endpoints ******************************************************/
const { usersController } = require("./users/usersController.js");

/* /user/ */
app.get("/user", checkProvidedTokenIsValid, usersController.getLoggedUser);

/********************************************* Error-Handling Middlewares *********************************************/
const { statusCodes } = require("./constants/statusCodes.js");

/* Route Not Found Error */
app.use((req, res) => {
  const errorText = `Route '[${req.method}] ${req.originalUrl}' could not be found!`;
  logger.error(errorText);
  res.status(statusCodes.NotFound).send({ error: errorText });
});

/* Uncontrolled Error */
app.use((err, req, res, next) => {
  const errorText = "Some uncontrolled internal error happened!";
  logger.error(errorText, err);
  res
    .status(statusCodes.InternalServerError)
    .send({ msg: errorText, error: err.message });
});

/*************************************************** Run the server ***************************************************/
const startServer = async () => {
  try {
    /* Import the database connection configuration ... */
    const { dbConnection } = require("./data/dbConnection.js");
    /* ... and connect to the (MongoDB) database */
    await dbConnection();

    /* Start express (HTTP) server listening for incoming requests */
    const server = app.listen(port, (error) => {
      if (error) {
        logger.error("The Express server couldn't get started!", error);
        return null;
      }
      /* The ExpressJS application is running, and ... */
      logger.info(
        `The HTTP server is listening for incoming requests on: http://localhost:${port}`
      );
    });
    return server;
  } catch (error) {
    logger.error("It could not be connected to the database!", error);
    return null;
  }
};
const server = startServer();
