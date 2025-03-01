/************************************************ Node modules needed *************************************************/
/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

const ConsumerSchema = new mongoose.Schema({
  address: { required: false, type: String },
  city: { required: false, type: String },
  country: { required: false, type: String },
  email: { required: true, type: String, unique: true },
  is_active: { default: true, type: Boolean },
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
  role: { default: "consumers", immutable: true, type: String },
  surname: { required: true, type: String }
}, { timestamps: true })

const ConsumerModel = mongoose.model("Consumer", ConsumerSchema)

/*************************************************** Module export ****************************************************/
module.exports = { ConsumerModel, ConsumerSchema }
