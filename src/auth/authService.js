const { ConsumerUserModel } = require("../users/consumerUsers/ConsumerUserModel.js");

/* Service to validate user credentials in the database */
const authService = {
  validateUser: async (email, password) => {
    const user = await ConsumerUserModel.findOne({ email });

    if (!user) return null;
    if (user.password !== password) return null; 
    return user;
  },
};

module.exports = { authService };