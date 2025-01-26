const jsonwebtoken = require("jsonwebtoken")
const { statusCodes } = require("../constants/statusCodes.js")

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(statusCodes.Forbidden).send({
        type: "error",
        msg: "Access denied. No token provided.",
      })
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jsonwebtoken.verify(token, process.env.jsonwebtoken_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(statusCodes.Forbidden).send({
        type: "error",
        msg: "Invalid or expired token.",
      })
    }
  },

  validateLoginRequest: (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(statusCodes.BadRequest).send({
        type: "error",
        msg: "Missing required fields: email and/or password.",
      });
    }

    next(); 
  },
}

module.exports = { authMiddleware }
