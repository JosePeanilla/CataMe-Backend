const jwt = require("jsonwebtoken");
const { statusCodes } = require("../constants/statusCodes.js");

const authMiddleware = {
  verifyToken: async (req, res, next) => {
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
      const user = await ConsumerUserModel.findById(decoded.id);
      if (!user || !user.isActive) {
        return res.status(statusCodes.Forbidden).send({
          type: "error",
          msg: "Access denied. User account is inactive.",
        });
      }
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
