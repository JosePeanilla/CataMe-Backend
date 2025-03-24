/************************************************** Internal logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal libraries *************************************************/
const mongoose = require("mongoose")
const { ReviewModel } = require("./ReviewModel.js")
const { statusCodes } = require("../constants/statusCodes.js")

const validateReviewData = (req, res, next) => {
    const { rating, wine, comment } = req.body
    const isUpdateRequest = req.method === "PUT"
  
    if (!isUpdateRequest && (!rating || !wine)) {
      return res.status(statusCodes.BadRequest).json({ error: "Missing required review fields" })
    }
  
    if (rating !== undefined && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
      return res.status(statusCodes.BadRequest).json({ error: "Rating must be an integer between 1 and 5" })
    }
  
    if (!isUpdateRequest && (!mongoose.Types.ObjectId.isValid(wine))) {
      return res.status(statusCodes.BadRequest).json({ error: "Invalid wine ID" })
    }
  
    if (comment && comment.length > 500) {
      return res.status(statusCodes.BadRequest).json({ error: "Comment must be less than 500 characters" })
    }
  
    next()
  }
  
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

/*************************************************** Module export ****************************************************/
module.exports = { validateReviewData, checkUserHasNotReviewed }
