const jwt = require("jsonwebtoken")
const brevo = require("@getbrevo/brevo")
require("dotenv").config()

brevo.ApiClient.instance.authentications["api-key"].apiKey = process.env.BREV_API
const apiInstance = new brevo.TransactionalEmailsApi()

const sendVerificationEmail = async (email, name, userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "24h" })
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3000"
    const verificationUrl = `${backendUrl}/auth/verify-email?token=${token}`

    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = "Confirma tu cuenta de WineApp"
    sendSmtpEmail.htmlContent = `
      <html><body>
        <h1>Hola ${name},</h1>
        <p>Bienvenidos a una experiencia única entre vinos y bodegas. 
        <br>Descubre WineApp.</p>
        <p>Estamos muy contentos de tenerte con nosotros!</p>
        <p>Gracias por registrarte en WineApp.</p>
        <p>Por favor, confirma tu cuenta haciendo clic en el siguiente botón:</p>
        <a href="${verificationUrl}" style="padding:10px 20px; background:#a43; color:#fff; text-decoration:none;">Verificar Cuenta</a>
        <p>Gracias por registrarte en WineApp.</p>
        <p>El equipo de WineApp</p>
      </body></html>
    `
    sendSmtpEmail.sender = { name: "Nuclio Grupo Rojo", email: "brevo@galu.cat" }
    sendSmtpEmail.to = [{ email, name }]
    sendSmtpEmail.replyTo = { email: "gruporojo.nuclio@gmail.com", name: "WineApp Support" }

    await apiInstance.sendTransacEmail(sendSmtpEmail)
  } catch (error) {
    console.error("Error sending verification email:", error)
    throw new Error("No se pudo enviar el correo de verificación.")
  }
}

module.exports = { sendVerificationEmail }
