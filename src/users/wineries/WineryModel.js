/*********************************************** Node Modules Needed ****************************************************/
/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

/************************************************ Winery Schema Definition **********************************************/
/**
 * This schema defines the structure of Winery user documents in the MongoDB database.
 * Each winery has authentication data, contact info, and metadata fields.
 */

const WinerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name of the winery
  },

  email: {
    type: String,
    required: true, // Used as unique identifier for login
    unique: true,
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Minimum 8 characters, at least one uppercase and one number
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(value)
      },
      message: "The password must be at least 8 characters, one capital letter and one number.",
    },
  },

  location: {
    type: String,
    required: true, // Physical location of the winery
  },

  phone: {
    type: String,
    default: null, // Optional contact number
  },

  description: {
    type: String,
    default: null, // Optional business description
  },

  web_page: {
    type: String,
    default: null, // Optional website link
  },

  is_verified: {
    type: Boolean,
    default: false, // Used for manual admin verification
  },

  role: {
    type: String,
    default: "wineries",
    immutable: true, // Cannot be changed once set
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  collection: "wineries" // Explicit collection name in MongoDB
})

/*********************************************** Winery Model Instantiation *********************************************/
const WineryModel = mongoose.model("Winery", WinerySchema)

/*************************************************** Module Export ******************************************************/
module.exports = { WineryModel, WinerySchema }
