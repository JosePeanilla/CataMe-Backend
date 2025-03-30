/******************************************** Mongoose Connection Setup *************************************************/
/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

/************************************************ Wine Schema Definition ************************************************/
/**
 * This schema defines the structure of the Wine documents stored in MongoDB.
 * It includes references to related entities like Region, Winery, and Reviews,
 * along with wine-specific fields such as type, grape variety, and vintage year.
 */

const WineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },                     // Name of the wine
    description: { type: String, required: true },              // Short description
    additionalDescription: { type: String, required: false },   // Optional extended description
    country: { type: String, required: true },                  // Country of origin
    image: { type: String },                                    // Optional image URL

    price: { type: Number, required: true },                    // Price in local currency
    year: { type: Number, required: true },                     // Vintage year

    type: {                                                    // Type of wine
      type: String,
      required: true,
      enum: ["Tinto", "Blanco", "Rosado", "Espumoso"],
    },

    grapeType: { type: String, required: true },               // Grape variety used

    region: {                                                  // Associated region (reference)
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
      required: true,
    },

    winery: {                                                  // Associated winery (reference)
      type: mongoose.Schema.Types.ObjectId,
      ref: "Winery",
      required: true,
    },

    reviews: [{                                                // Array of review IDs (references)
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    }],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
)

/*********************************************** Wine Model Instantiation ***********************************************/
const WineModel = mongoose.model("Wine", WineSchema)

/*************************************************** Module Export ******************************************************/
module.exports = { WineModel }
