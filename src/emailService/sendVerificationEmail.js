/************************************************** Internal Logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node Modules Needed *************************************************/
/* Manage JWT tokens */
const jwt = require("jsonwebtoken")

/* Sendinblue/Brevo SDK for transactional emails */
const brevo = require("@getbrevo/brevo")

/************************************************ Internal Libraries ***************************************************/
require("dotenv").config()
const { statusCodes } = require("../constants/statusCodes.js")

/************************************************ Brevo Configuration **************************************************/
/* Set up API key */
brevo.ApiClient.instance.authentications["api-key"].apiKey = process.env.BREV_API
const apiInstance = new brevo.TransactionalEmailsApi()

/************************************************ Email Sender Function ************************************************/
/**
 * Sends a verification email with a signed token to confirm the user's account.
 * @param {string} email - Recipient's email.
 * @param {string} name - Recipient's name.
 * @param {string} userId - User ID to encode in the verification token.
 */
const sendVerificationEmail = async (email, name, userId) => {
  try {
    // Generate token valid for 24h
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "24h" })

    // Compose verification URL
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3000"
    const verificationUrl = `${backendUrl}/auth/verify-email?token=${token}`

    // Compose email
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = "Confirma tu cuenta de WineApp"
    sendSmtpEmail.htmlContent = `
      <html><body>
        <h1>Hola ${name},</h1>
        <p>Bienvenido a una experiencia única entre vinos y bodegas.<br>Descubre WineApp.</p>
        <p>Estamos muy contentos de tenerte con nosotros.</p>
        <p>Por favor, confirma tu cuenta haciendo clic en el siguiente botón:</p>
        <a href="${verificationUrl}" style="padding:10px 20px; background:#a43; color:#fff; text-decoration:none;">Verificar Cuenta</a>
        <p>Gracias por registrarte en WineApp.</p>
        <p>El equipo de WineApp</p>
      </body></html>
    `
    sendSmtpEmail.sender = { name: "Nuclio Grupo Rojo", email: "brevo@galu.cat" }
    sendSmtpEmail.to = [{ email, name }]
    sendSmtpEmail.replyTo = { email: "gruporojo.nuclio@gmail.com", name: "WineApp Support" }

    // Send email
    await apiInstance.sendTransacEmail(sendSmtpEmail)
    logger.info(`Verification email successfully sent to ${email}`)
  } catch (error) {
    const errorText = "Failed to send verification email"
    logger.error(errorText, error)
    const err = new Error("Could not send verification email.")
    err.statusCode = statusCodes.InternalServerError
    throw err
  }
}

/*************************************************** Module Export ****************************************************/
module.exports = { sendVerificationEmail }
