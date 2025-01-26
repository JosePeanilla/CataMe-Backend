const mongoose = require("mongoose")

const ConsumerSchema = new mongoose.Schema({
  email: { required: true, type: String, unique: true },
  is_active: { default: true, type: Boolean },
  name: { required: true, type: String },
  password: { required: true, type: String },
  surname: { required: true, type: String }
}, { timestamps: true })

const ConsumerModel = mongoose.model("consumer", ConsumerSchema)

module.exports = { ConsumerModel, ConsumerSchema }
