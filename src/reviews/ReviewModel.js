/*********************************************** Node Modules Needed ****************************************************/
/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

/*********************************************** Review Schema Definition ************************************************/
/**
 * Defines the schema for wine reviews in the database.
 * Each review is linked to a specific wine and user (consumer).
 */

const ReviewSchema = new mongoose.Schema({
  // Reference to the wine being reviewed
  wine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wine",
    required: true
  },

  // Reference to the user (consumer) who created the review
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consumer",
    required: true
  },

  // Rating score between 1 and 5
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  // Optional textual comment
  comment: {
    type: String,
    required: false
  },

  // Review creation date (redundant with timestamps but kept for legacy or explicit querying)
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
})

/*********************************************** Review Model Instantiation **********************************************/
const ReviewModel = mongoose.model("Review", ReviewSchema)

/*************************************************** Module Export ******************************************************/
module.exports = { ReviewModel, ReviewSchema }
