/*********************************************** Node Modules Needed ****************************************************/
/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

/*********************************************** Consumer Schema Definition **********************************************/
/**
 * This schema defines the structure for consumer user documents in MongoDB.
 * Consumers are users who can register, log in, post reviews, and interact with wines.
 */

const ConsumerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Consumer's first name
  },

  surname: {
    type: String,
    required: true, // Consumer's last name
  },

  email: {
    type: String,
    required: true, // Used for authentication
    unique: true,
  },

  password: {
    type: String,
    required: true,
    validate: {
      // At least 8 characters, one uppercase letter and one number
      validator: function (value) {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(value)
      },
      message: "The password must be at least 8 characters, one capital letter and one number.",
    },
  },

  address: {
    type: String,
    required: false, // Optional shipping or profile address
  },

  city: {
    type: String,
    required: false,
  },

  country: {
    type: String,
    required: false,
  },

  is_verified: {
    type: Boolean,
    default: false, // Used to confirm email verification
  },

  role: {
    type: String,
    default: "consumers",
    immutable: true, // Cannot be changed once set
  },
}, {
  timestamps: true, // Automatically includes createdAt and updatedAt
})

/*********************************************** Consumer Model Instantiation ********************************************/
const ConsumerModel = mongoose.model("Consumer", ConsumerSchema)

/*************************************************** Module Export ******************************************************/
module.exports = { ConsumerModel, ConsumerSchema }
