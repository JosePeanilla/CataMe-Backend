/************************************************** Internal Logger *****************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries ***************************************************/
const mongoose = require("mongoose")
const { ReviewModel } = require("./ReviewModel.js")
const { statusCodes } = require("../constants/statusCodes.js")

/**************************************** Middleware: Validate Review Input Data ****************************************/
/**
 * Ensures required fields are present and valid for creating or updating a review.
 * - Rating must be an integer between 1 and 5.
 * - Wine must be a valid MongoDB ObjectId.
 * - Comment must not exceed 500 characters.
 */
const validateReviewData = (req, res, next) => {
  const { rating, wine, comment } = req.body
  const isUpdateRequest = req.method === "PUT"

  // For POST: rating and wine are required
  if (!isUpdateRequest && (!rating || !wine)) {
    return res.status(statusCodes.BadRequest).json({ error: "Missing required review fields" })
  }

  // Validate rating
  if (rating !== undefined && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
    return res.status(statusCodes.BadRequest).json({ error: "Rating must be an integer between 1 and 5" })
  }

  // Validate wine ID
  if (!isUpdateRequest && (!mongoose.Types.ObjectId.isValid(wine))) {
    return res.status(statusCodes.BadRequest).json({ error: "Invalid wine ID" })
  }

  // Validate comment length
  if (comment && comment.length > 500) {
    return res.status(statusCodes.BadRequest).json({ error: "Comment must be less than 500 characters" })
  }

  next()
}

/************************ Middleware: Prevent User from Reviewing Same Wine Twice **************************************/
/**
 * Prevents a user from reviewing the same wine more than once.
 * Should be used before creating a review.
 */
const checkUserHasNotReviewed = async (req, res, next) => {
  try {
    const { wine } = req.body
    const userId = res.locals.loggedUserToken.id

    if (!wine) {
      return res.status(statusCodes.BadRequest).json({ error: "Wine ID is required" })
    }

    const existingReview = await ReviewModel.findOne({ wine, user: userId })

    if (existingReview) {
      return res.status(statusCodes.BadRequest).json({ error: "You already reviewed this wine" })
    }

    next()
  } catch (error) {
    logger.error("Error checking user's review", error)
    res.status(statusCodes.InternalServerError).json({ error: "Error checking user's review" })
  }
}

/*************************************************** Module Export ******************************************************/
module.exports = {
  validateReviewData,
  checkUserHasNotReviewed
}
