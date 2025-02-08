/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

const WineSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    region: { type: String, required: true },
    type: { type: String, required: true },
    winery: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
)

const WineModel = mongoose.model("Wine", WineSchema)

/*************************************************** Module export ****************************************************/
module.exports = { WineModel }
