const mongoose = require("mongoose")

const consumerUserSchema = new mongoose.Schema({
  email: { required: true, type: String, unique: true },
  is_active: { required: true, type: Boolean, default: true },
  name: { required: true, type: String },
  password: { required: true, type: String },
  surname: { required: true, type: String }
}, { timestamps: true })

const ConsumerUserModel = mongoose.model("consumer_user", consumerUserSchema)

module.exports = { ConsumerUserModel }
