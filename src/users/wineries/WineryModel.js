const mongoose = require("mongoose")

const WinerySchema = new mongoose.Schema({
  description: { default: null, type: String },
  email: { required: true, type: String, unique: true },
  location: { required: true, type: String },
  name: { required: true, type: String },
  password: { required: true, type: String },
  phone: { default: null, type: String },
  web_page: { default: null, type: String }
}, { timestamps: true })

const WineryModel = mongoose.model("winery", WinerySchema)

module.exports = { WineryModel, WinerySchema }
