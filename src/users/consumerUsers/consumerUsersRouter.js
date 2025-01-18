const express = require("express")  /* Node module used to create an ExpressJS router */
const consumerUsersRouter = express.Router()  /* ExpressJS router object */

/* Middlewares */
const {
  checkRequiredArgsAreProvided
} = require("./consumerUsersMiddlewares.js")
const { authMiddleware } = require("../../auth/authMiddleware.js");

/* Endpoints */
const { consumerUsersController } = require("./consumerUsersController.js")

/* Protected Routes */
consumerUsersRouter.get("/",
  authMiddleware.verifyToken, 
  consumerUsersController.getAllConsumerUsers 
);
consumerUsersRouter.post("/",
  authMiddleware.verifyToken, 
  checkRequiredArgsAreProvided, 
  consumerUsersController.createConsumerUser
);

module.exports = { consumerUsersRouter };
