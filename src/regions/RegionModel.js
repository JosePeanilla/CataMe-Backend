/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

const RegionSchema = new mongoose.Schema(
  { 
    country: { type: String, required: true },
    image: { type: String, required: false },
    name: { type: String, required: true },
  },
  { timestamps: true }
)

const RegionModel = mongoose.model("Region", RegionSchema)

/*************************************************** Module export ****************************************************/
module.exports = { RegionModel }