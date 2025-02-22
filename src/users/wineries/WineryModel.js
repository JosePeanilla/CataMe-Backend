/************************************************ Node modules needed *************************************************/
/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

const WinerySchema = new mongoose.Schema({
  description: { default: null, type: String },
  email: { required: true, type: String, unique: true },
  is_active: { default: true, type: Boolean },
  location: { required: true, type: String },
  name: { required: true, type: String },
  password: { 
    required: true, 
    type: String,
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(value)
      },
      message: "The password must be at least 8 characters, one capital letter and one number.",
    },
  }, 
  phone: { default: null, type: String },
  role: { default: "wineries", immutable: true, type: String },
  web_page: { default: null, type: String }
}, { 
  timestamps: true,
  collection: "wineries"
 })

 const WineryModel = mongoose.model("Winery", WinerySchema)

/*************************************************** Module export ****************************************************/
module.exports = { WineryModel, WinerySchema }
