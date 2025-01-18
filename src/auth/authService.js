const { ConsumerUserModel } = require("../users/consumerUsers/ConsumerUserModel.js");

const authService = {
  validateUser: async (email, password) => {
    const user = await ConsumerUserModel.findOne({ email });

    // Check if the user exists and if their password is correct
    if (!user || user.password !== password) {
      return { success: false, msg: "Invalid email or password" };
    }

    // Check if the profile is active
    if (!user.isActive) {
      return { success: false, msg: "User account is inactive" };
    }
    
    // Returns the user if it is valid and active
    return { success: true, user }; 
  },
};

module.exports = { authService };
