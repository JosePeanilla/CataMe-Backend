const mongoose = require("mongoose")

const WinerySchema = new mongoose.Schema({
  description: String,
  email: { required: true, type: String, unique: true },
  location: { required: true, type: String },
  name: { required: true, type: String },
  password: { required: true, type: String },
  phone: String,
  web_page: String
}, { timestamps: true })

const WineryModel = mongoose.model("winery", WinerySchema)

module.exports = { WineryModel, WinerySchema }
