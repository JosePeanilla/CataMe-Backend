const express = require("express");
const authRouter = express.Router();

/* Controller of the 'auth' requests and responses handling */
const { authController } = require("./authController.js");

/* Endpoint for logging */
authRouter.post("/login", authController.login);

module.exports = { authRouter };