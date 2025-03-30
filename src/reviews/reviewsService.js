/************************************************** Internal Logger *****************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries ***************************************************/
/* Models for review, consumer, and wine entities */
const { ReviewModel } = require("./ReviewModel.js")
const { ConsumerModel } = require("../users/consumers/ConsumerModel.js")
const { WineModel } = require("../wines/WineModel.js")
const mongoose = require("mongoose")
const { getIO } = require("../socket/socket.js")

/*********************************************** Reviews Service: Business Logic Layer **********************************/
/**
 * Handles all operations related to wine reviews:
 * create, read, update, delete, and socket notifications.
 */

const reviewsService = {
  /**
   * Create a new review and notify the winery via Socket.io
   */
  createReview: async (reviewData) => {
    try {
      // Create the review
      const newReview = await ReviewModel.create(reviewData)

      // Attach review to corresponding wine
      const updatedWine = await WineModel.findByIdAndUpdate(
        reviewData.wine,
        { $push: { reviews: newReview._id } },
        { new: true }
      ).populate("winery")

      // Notify winery via socket
      if (updatedWine && updatedWine.winery) {
        const io = getIO()
        const wineryId = updatedWine.winery._id.toString()
        logger.info(`Emitting "new-review" event to winery room: ${wineryId}`)

        io.to(wineryId).emit("new-review", {
          message: "You received a new review",
          review: newReview,
          wine: {
            id: updatedWine._id,
            name: updatedWine.name
          }
        })
      }

      return newReview
    } catch (error) {
      logger.error("Error creating review:", error)
      throw new Error("Could not create review. Please try again.")
    }
  },

  /**
   * Get all reviews
   */
  getAllReviews: async () => {
    try {
      const reviews = await ReviewModel.find()
        .populate({ path: "user", select: "name surname", model: ConsumerModel })
        .populate("wine", "name")
        .sort({ createdAt: -1 })
      return reviews
    } catch (error) {
      logger.error("Error getting all reviews:", error)
      throw new Error("Could not retrieve reviews. Please try again.")
    }
  },

  /**
   * Get all reviews made by a specific user
   */
  getReviewsByUser: async (userId) => {
    try {
      const reviews = await ReviewModel.find({ user: userId })
        .populate({ path: "user", select: "name surname", model: ConsumerModel })
        .sort({ createdAt: -1 })
      return reviews
    } catch (error) {
      logger.error("Error getting reviews for user:", error)
      throw new Error("Could not retrieve user reviews. Please try again.")
    }
  },

  /**
   * Get all reviews for a specific wine
   */
  getReviewsByWine: async (wineId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(wineId)) {
        throw new Error(`Invalid wine ID '${wineId}'`)
      }

      const reviews = await ReviewModel.find({ wine: wineId })
        .populate({ path: "user", select: "name surname", model: ConsumerModel })
        .sort({ createdAt: -1 })
      return reviews
    } catch (error) {
      logger.error("Error getting reviews for wine:", error)
      throw new Error("Could not retrieve reviews. Please try again.")
    }
  },

  /**
   * Get a single review by ID
   */
  getReviewById: async (id) => {
    try {
      const review = await ReviewModel.findById(id)
        .populate("user", "name surname")

      if (!review) {
        throw new Error(`No review found with ID '${id}'`)
      }

      return review
    } catch (error) {
      logger.error("Error getting review by ID:", error)
      throw new Error("Could not retrieve review. Please try again.")
    }
  },

  /**
   * Update a review (only if the user owns it)
   */
  updateReview: async (id, userId, reviewData) => {
    try {
      const updatedReview = await ReviewModel.findOneAndUpdate(
        { _id: id, user: userId },
        reviewData,
        { new: true, runValidators: true }
      )
        .populate({ path: "user", select: "name surname", model: ConsumerModel })
        .populate("wine", "name")

      if (!updatedReview) {
        throw new Error(`No review found with ID '${id}' or unauthorized user`)
      }

      return updatedReview
    } catch (error) {
      logger.error("Error updating review:", error)
      throw new Error("Could not update review. Please try again.")
    }
  },

  /**
   * Delete a review (only if the user owns it)
   */
  deleteReview: async (id, userId) => {
    try {
      const review = await ReviewModel.findById(id)

      if (!review) {
        throw new Error(`No review found with ID '${id}', cannot delete.`)
      }

      if (review.user.toString() !== userId) {
        throw new Error("You are not authorized to delete this review.")
      }

      await ReviewModel.findByIdAndDelete(id)
      return { message: "Review deleted successfully", id }
    } catch (error) {
      logger.error("Error deleting review:", error)
      throw new Error("Could not delete review. Please try again.")
    }
  }
}

/*************************************************** Module Export ******************************************************/
module.exports = { reviewsService }
