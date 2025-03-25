const brevo = require('@getbrevo/brevo');
require('dotenv').config();

// Configurar la API key en la instancia global
brevo.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREV_API;

const apiInstance = new brevo.TransactionalEmailsApi();

async function sendWelcomeEmail(toEmail, toName) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = "Welcome to WineApp!";
    sendSmtpEmail.htmlContent = `<html><body>
      <h1>Hola, ${toName}!</h1>
      <p>Bienvenidos a una experiencia única entre vinos y bodegas. 
      <br>Descubre WineApp.</p>
      <p>Estamos muy contentos de tenerte con nosotros!</p>
      <button><a href="https://wineapp-rojo.netlify.app">WineApp</a></button>
    </body></html>`;
    
    sendSmtpEmail.sender = { 
      name: "Nuclio Grupo Rojo", 
      email: "brevo@galu.cat" 
    };
    
    sendSmtpEmail.to = [{ email: toEmail, name: toName }];
    sendSmtpEmail.replyTo = { email: "gruporojo.nuclio@gmail.com", name: "Nuclio Grupo Rojo" };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendWelcomeEmail };
