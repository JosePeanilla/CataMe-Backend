const express = require("express");
const authRouter = express.Router();

/* Authentication Request and Response Handling Controller Route */
const { authController } = require("./authController.js");

/* Endpoint for loging */
authRouter.post("/login", authController.login);

module.exports = { authRouter };
