const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { ConsumerModel } = require("../users/consumers/ConsumerModel.js")
const { WineryModel } = require("../users/wineries/WineryModel.js")

router.get("/verify-email", async (req, res) => {
  const { token } = req.query
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id } = decoded

    let user = await ConsumerModel.findById(id) || await WineryModel.findById(id)
    if (!user) return res.status(404).json({ error: "Usuario no encontrado." })

    if (user.is_verified) {
      return res.status(200).json({ message: "Cuenta ya verificada." })
    }

    user.is_verified = true
    await user.save()
    return res.status(200).json({ message: "Cuenta verificada correctamente." })
  } catch (error) {
    return res.status(400).json({ error: "Token inválido o expirado." })
  }
})

module.exports = { authRouter: router }
