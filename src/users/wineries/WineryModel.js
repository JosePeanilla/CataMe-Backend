/************************************************ Node modules needed *************************************************/
/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

const WinerySchema = new mongoose.Schema({
  description: { default: null, type: String },
  email: { required: true, type: String, unique: true },
  is_active: { default: false, type: Boolean },
  location: { required: true, type: String },
  name: { required: true, type: String },
  password: { required: true, type: String },
  phone: { default: null, type: String },
  role: { default: "wineries", immutable: true, type: String },
  web_page: { default: null, type: String }
}, { timestamps: true })

const WineryModel = mongoose.model("winery", WinerySchema)

/*************************************************** Module export ****************************************************/
module.exports = { WineryModel, WinerySchema }
