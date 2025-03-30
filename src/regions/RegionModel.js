/*********************************************** Node Modules Needed ****************************************************/
/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

/*********************************************** Region Schema Definition ***********************************************/
/**
 * Defines the schema for wine-producing regions.
 * Each region has a country, name, optional description and image.
 * Includes timestamps for createdAt and updatedAt.
 */

const RegionSchema = new mongoose.Schema(
  {
    // Country to which the region belongs (required)
    country: {
      type: String,
      required: true
    },

    // Optional description of the region
    description: {
      type: String
    },

    // Optional image URL (if not provided, fallback is handled in service layer)
    image: {
      type: String,
      required: false
    },

    // Name of the region (required)
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields automatically
  }
)

/*********************************************** Region Model Instantiation **********************************************/
const RegionModel = mongoose.model("Region", RegionSchema)

/*************************************************** Module Export ******************************************************/
module.exports = { RegionModel }
