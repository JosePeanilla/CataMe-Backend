const mongoose = require("mongoose")

const consumerUserSchema = new mongoose.Schema({
  name: { required: true, type: String },
  surname: { required: true, type: String }
}, { timestamps: true })

const ConsumerUserModel = mongoose.model("consumer_user", consumerUserSchema)

module.exports = { ConsumerUserModel, consumerUserSchema }
