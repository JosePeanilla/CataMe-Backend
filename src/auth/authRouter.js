/************************************************** Internal Logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node Modules Needed *************************************************/
/* Used to create ExpressJS router */
const express = require("express")
const router = express.Router()

/* JWT for decoding verification tokens */
const jwt = require("jsonwebtoken")

/************************************************* Internal Models ****************************************************/
const { ConsumerModel } = require("../users/consumers/ConsumerModel.js")
const { WineryModel } = require("../users/wineries/WineryModel.js")

/*************************************************** Status Codes *****************************************************/
const { statusCodes } = require("../constants/statusCodes.js")

/******************************************** Verify Email Route: /auth/verify-email **********************************/
/**
 * Verifies a user's email address using a token sent via email.
 * Works for both consumer and winery users.
 * If the token is valid and the user is found, sets `is_verified: true`.
 */
router.get("/verify-email", async (req, res) => {
  const { token } = req.query

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id } = decoded

    // Try to find the user (could be consumer or winery)
    let user = await ConsumerModel.findById(id) || await WineryModel.findById(id)

    // If user not found
    if (!user) {
      const errorText = "Usuario no encontrado."
      logger.error(errorText)
      return res.status(statusCodes.NotFound).json({ error: errorText })
    }

    // If already verified
    if (user.is_verified) {
      const infoText = "Cuenta ya verificada."
      logger.info(infoText)
      return res.status(statusCodes.OK).json({ message: infoText })
    }

    // Update and save user verification status
    user.is_verified = true
    await user.save()

    const successText = "Cuenta verificada correctamente."
    logger.info(successText)
    return res.status(statusCodes.OK).json({ message: successText })

  } catch (error) {
    const errorText = "Token inválido o expirado."
    logger.error(errorText, error)
    return res.status(statusCodes.BadRequest).json({ error: errorText })
  }
})

/*************************************************** Module Export ****************************************************/
module.exports = { authRouter: router }
