const express = require("express");
const authRouter = express.Router();

/* Controller of the 'auth' requests and responses handling */
const { authController } = require("./authController.js");

/* Endpoints for login */
authRouter.post("/login", authController.login);

module.exports = { authRouter };