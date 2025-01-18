const jwt = require("jsonwebtoken");
const { statusCodes } = require("../constants/statusCodes.js");

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(statusCodes.Forbidden).send({
        type: "error",
        msg: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
      next();
    } catch (error) {
      res.status(statusCodes.Forbidden).send({
        type: "error",
        msg: "Invalid or expired token.",
      });
    }
  },
};

module.exports = { authMiddleware };
