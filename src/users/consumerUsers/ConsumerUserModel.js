const mongoose = require("mongoose")

const consumerUserSchema = new mongoose.Schema({
  name: { required: true, type: String },
  surname: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  isActive: { required: true, type: Boolean, default: true }
}, { timestamps: true })

const ConsumerUserModel = mongoose.model("consumer_user", consumerUserSchema)

module.exports = { ConsumerUserModel }
