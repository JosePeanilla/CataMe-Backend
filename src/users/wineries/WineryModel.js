const mongoose = require("mongoose")

const WinerySchema = new mongoose.Schema({
  contact_email: { required: true, type: String },
  contact_telephone: { required: true, type: String },
  description: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  name: { required: true, type: String },
  password: { required: true, type: String },
  web_page: { required: true, type: String }
}, { timestamps: true })

const WineryModel = mongoose.model("winery", WinerySchema)

module.exports = { WineryModel, WinerySchema }
