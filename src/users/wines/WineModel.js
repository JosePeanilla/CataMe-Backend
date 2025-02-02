/* Manage MongoDB database accesses */
const mongoose = require("mongoose");

const WineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    wineryName: { type: String, required: true },
    type: { type: String, required: true },
    regionId: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const WineModel = mongoose.model("Wine", WineSchema);

/*************************************************** Module export ****************************************************/
module.exports = { WineModel };
