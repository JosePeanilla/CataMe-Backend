const jwt = require("jsonwebtoken");
const { authService } = require("./authService.js");
const { statusCodes } = require("../constants/statusCodes.js");

/* Controller for handling authentication requests and responses */
const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate credentials
      const user = await authService.validateUser(email, password);
      if (!user) {
        return res.status(statusCodes.BadRequest).send({
          type: "error",
          msg: "Invalid email or password",
        });
      }

      if (!user.isActive) {
        return res.status(statusCodes.Forbidden).send({
          type: "error",
          msg: "User account is inactive",
        });
      }

      // Generate a JWT token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          fullName: user.full_name,
        },
        process.env.JWT_SECRET, 
        { expiresIn: "1h" } 
      );

      res.status(statusCodes.OK).send({
        type: "success",
        msg: "Login successful",
        token, 
      });
    } catch (error) {
      res.status(statusCodes.InternalServerError).send({
        type: "error",
        msg: "An error occurred during login",
      });
    }
  },
};

module.exports = { authController };