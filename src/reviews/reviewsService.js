/************************************************** Internal logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal libraries *************************************************/
/* Model of 'reviews' entity */
const { ReviewModel } = require("./ReviewModel.js")
const { ConsumerModel } = require("../users/consumers/ConsumerModel.js")
const mongoose = require("mongoose")

/* Service which interacts with the 'reviews' database */
const reviewsService = {
    createReview: async (reviewData) => {
        try {
            const newReview = await ReviewModel.create(reviewData)
            return newReview
        } catch (error) {
            logger.error("Error creating review:", error)
            throw new Error("Could not create review. Please try again.")
        }      
    },

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

    getReviewById: async (id) => {
        try {
            const review = await ReviewModel.findById(id).populate("user", "name surname")
            if (!review) {
                throw new Error(`No review found with ID '${id}'`)
            }
            return review
        } catch (error) {
            logger.error("Error getting review by ID:", error)
            throw new Error("Could not retrieve review. Please try again.")
        }
    },

    updateReview: async (id, reviewData) => {
        try {
            const updatedReview = await ReviewModel.findByIdAndUpdate(
                id,
                reviewData,
                { new: true, runValidators: true } 
            )
            .populate({ path: "user", select: "name surname", model: ConsumerModel })
            .populate("wine", "name")
    
            if (!updatedReview) {
                throw new Error(`No review found with ID '${id}'`)
            }
    
            return updatedReview;
        } catch (error) {
            logger.error("Error updating review:", error)
            throw new Error("Could not update review. Please try again.")
        }
    },    

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

/*************************************************** Module export ****************************************************/
module.exports = { reviewsService }
