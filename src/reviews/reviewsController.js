/************************************************** Internal Logger *****************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries ***************************************************/
/* Review service and HTTP status codes */
const { reviewsService } = require("./reviewsService.js")
const { statusCodes } = require("../constants/statusCodes.js")

/*********************************************** Reviews Controller: Request Handlers ***********************************/
/**
 * Handles HTTP requests related to wine reviews.
 */

const reviewsController = {
  /**
   * POST /reviews
   * Create a new review for a wine
   */
  createReview: async (req, res) => {
    try {
      const { wine, rating, comment } = req.body
      const user = res.locals.loggedUserToken.id

      const newReview = await reviewsService.createReview({ wine, user, rating, comment })
      const successText = "Review created successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).json({ message: successText, data: newReview })
    } catch (error) {
      const errorText = "Review could not be created!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).json({ message: errorText, error: error.message })
    }
  },

  /**
   * GET /reviews/:id
   * Get a review by its ID
   */
  getReviewById: async (req, res) => {
    try {
      const { id } = req.params
      const review = await reviewsService.getReviewById(id)
      const successText = "Review retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).json({ message: successText, data: review })
    } catch (error) {
      const errorText = "Review could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.NotFound).json({ message: errorText, error: error.message })
    }
  },

  /**
   * GET /reviews/wine/:wineId
   * Get all reviews for a specific wine
   */
  getReviewsByWine: async (req, res) => {
    try {
      const { wineId } = req.params
      const reviews = await reviewsService.getReviewsByWine(wineId)
      const successText = "Reviews retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).json({ message: successText, data: reviews })
    } catch (error) {
      const errorText = "Reviews could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).json({ message: errorText, error: error.message })
    }
  },

  /**
   * GET /reviews
   * Get all reviews in the system
   */
  getAllReviews: async (req, res) => {
    try {
      const reviews = await reviewsService.getAllReviews()
      const successText = "All reviews retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).json({ message: successText, data: reviews })
    } catch (error) {
      const errorText = "Reviews could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).json({ message: errorText, error: error.message })
    }
  },

  /**
   * GET /reviews/user/:userId
   * Get all reviews written by a specific user
   */
  getReviewsByUser: async (req, res) => {
    try {
      const { userId } = req.params
      const reviews = await reviewsService.getReviewsByUser(userId)
      const successText = "User reviews retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).json({ message: successText, data: reviews })
    } catch (error) {
      const errorText = "User reviews could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).json({ message: errorText, error: error.message })
    }
  },

  /**
   * PUT /reviews/:id
   * Update a review (only if the user is the owner)
   */
  updateReview: async (req, res) => {
    try {
      const { id } = req.params
      const userId = res.locals.loggedUserToken.id
      const updatedReview = await reviewsService.updateReview(id, userId, req.body)
      const successText = "Review updated successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).json({ message: successText, data: updatedReview })
    } catch (error) {
      const errorText = "Review could not be updated!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).json({ message: errorText, error: error.message })
    }
  },

  /**
   * DELETE /reviews/:id
   * Delete a review (only if the user is the owner)
   */
  deleteReview: async (req, res) => {
    try {
      const { id } = req.params
      const userId = res.locals.loggedUserToken.id
      const deletedReview = await reviewsService.deleteReview(id, userId)
      const successText = "Review deleted successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).json({ message: successText, data: deletedReview })
    } catch (error) {
      const errorText = "Review could not be deleted!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).json({ message: errorText, error: error.message })
    }
  }
}

/*************************************************** Module Export ******************************************************/
module.exports = { reviewsController }
