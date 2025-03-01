/************************************************** Internal logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal libraries *************************************************/
/* Model of 'reviews' entity */
const { reviewsService } = require("./reviewsService.js")

const reviewsController = {
    createReview: async (req, res) => {
        try {
            const { wine, rating, comment } = req.body
            const user = res.locals.loggedUserToken.id

            const newReview = await reviewsService.createReview({ wine, user, rating, comment })
            const successText = "Review created successfully!"
            logger.debug(successText)
            res.status(200).json({ message: successText, data: newReview })
        } catch (error) {
            const errorText = "Review could not be created!"
            logger.error(errorText, error)
            res.status(500).json({ message: errorText, error: error.message })
        }
    },

    getReviewsByWine: async (req, res) => {
        try {
            const { wineId } = req.params
            const reviews = await reviewsService.getReviewsByWine(wineId)
            const successText = "Reviews retrieved successfully!"
            logger.debug(successText)
            res.status(200).json({ message: successText, data: reviews })
        } catch (error) {
            const errorText = "Reviews could not be retrieved!"
            logger.error(errorText, error)
            res.status(500).json({ message: errorText, error: error.message })      
        }
    },

    getAllReviews: async (req, res) => {
        try {
            const reviews = await reviewsService.getAllReviews()
            const successText = "All reviews retrieved successfully!"
            logger.debug(successText)
            res.status(200).json({ message: successText, data: reviews })
        } catch (error) {
            const errorText = "Reviews could not be retrieved!"
            logger.error(errorText, error)
            res.status(500).json({ message: errorText, error: error.message })
        }
    },

    getReviewsByUser: async (req, res) => {
        try {
            const { userId } = req.params
            const reviews = await reviewsService.getReviewsByUser(userId)
            const successText = "User reviews retrieved successfully!"
            logger.debug(successText)
            res.status(200).json({ message: successText, data: reviews })
        } catch (error) {
            const errorText = "User reviews could not be retrieved!"
            logger.error(errorText, error)
            res.status(500).json({ message: errorText, error: error.message })
        }
    },

    updateReview: async (req, res) => {
        try {
            const { id } = req.params
            const userId = res.locals.loggedUserToken.id
            const updatedReview = await reviewsService.updateReview(id, userId, req.body)
            const successText = "Review updated successfully!"
            logger.debug(successText)
            res.status(200).json({ message: successText, data: updatedReview })
        } catch (error) {
            const errorText = "Review could not be updated!"
            logger.error(errorText, error)
            res.status(500).json({ message: errorText, error: error.message })
        }
    },    

    deleteReview: async (req, res) => {
        try {
            const { id } = req.params
            const userId = res.locals.loggedUserToken.id
            const deletedReview = await reviewsService.deleteReview(id, userId)
            const successText = "Review deleted successfully!"
            logger.debug(successText)
            res.status(200).json({ message: successText, data: deletedReview })
        } catch (error) {
            const errorText = "Review could not be deleted!"
            logger.error(errorText, error)
            res.status(500).json({ message: errorText, error: error.message })
        }
    }
}

/*************************************************** Module export ****************************************************/
module.exports = { reviewsController }
