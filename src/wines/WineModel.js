/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

const WineSchema = new mongoose.Schema(
  {
    additionalDescription: { type: String, required: false },
    country: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    region: { type: mongoose.Schema.Types.ObjectId, ref: "Region", required: true },
    type: { type: String, required: true },
    winery: { type: mongoose.Schema.Types.ObjectId, ref: "Winery", required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
)

const WineModel = mongoose.model("Wine", WineSchema)

/*************************************************** Module export ****************************************************/
module.exports = { WineModel }
