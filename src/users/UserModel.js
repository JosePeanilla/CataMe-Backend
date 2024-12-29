const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstname: { required: true, type: String },
  lastname: { required: true, type: String }
}, { timestamps: true })

const UserModel = mongoose.model("user", userSchema)

module.exports = { UserModel }
