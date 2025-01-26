const jsonwebtoken = require("jsonwebtoken"); /* Node module used to manage JSON Web Tokens (JWT) for authentication and authorization */
const { statusCodes } = require("../constants/statusCodes.js");
const { authService } = require("./authService.js");

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await authService.validateUser(email, password);

      // If it does not validate correctly (user not found, incorrect password or inactive)
      if (!result.success) {
        return res.status(statusCodes.Forbidden).send({
          type: "error",
          msg: result.msg,
        });
      }

      // Valid user, generate token
      const user = result.user;
      const token = jsonwebtoken.sign(
        { id: user._id, email: user.email, fullName: `${user.name} ${user.surname}` },
        process.env.jsonwebtoken_SECRET,
        { expiresIn: "1h" }
      );

      res.status(statusCodes.OK).send({
        type: "success",
        msg: "User logged in successfully!",
        token
      });
    } catch (error) {
      logger.error("User could not be logged in!\n", error)
      res.status(statusCodes.InternalServerError).send({
        type: "error",
        msg: "An error occurred during login",
      });
    }
  },
};

module.exports = { authController };
