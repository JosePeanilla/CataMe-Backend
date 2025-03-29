/*********************************************** Node Modules Needed ****************************************************/
/* Used to create an ExpressJS router */
const express = require("express")

/********************************************** ExpressJS Router Object *************************************************/
const reviewsRouter = express.Router()

/**************************************************** Middlewares *******************************************************/
/* Custom middlewares for review validation and authorization */
const { validateReviewData, checkUserHasNotReviewed } = require("./reviewsMiddlewares.js")
const { checkProvidedTokenIsValid, checkUserIsAuthorized } = require("../auth/authMiddlewares.js")

/****************************************************** Controller ******************************************************/
const { reviewsController } = require("./reviewsController.js")

/*********************************************** Reviews Routes (RESTful API) *******************************************/

/**
 * POST /reviews
 * Create a new review (only if the user hasn't reviewed the wine yet)
 */
reviewsRouter.post(
  "/",
  checkProvidedTokenIsValid,
  checkUserHasNotReviewed,
  validateReviewData,
  reviewsController.createReview
)

/**
 * GET /reviews
 * Retrieve all reviews
 */
reviewsRouter.get("/", reviewsController.getAllReviews)

/**
 * GET /reviews/:id
 * Get a single review by its ID
 */
reviewsRouter.get("/:id", reviewsController.getReviewById)

/**
 * GET /reviews/wine/:wineId
 * Get all reviews for a specific wine
 */
reviewsRouter.get("/wine/:wineId", reviewsController.getReviewsByWine)

/**
 * GET /reviews/user/:userId
 * Get all reviews submitted by a specific user
 */
reviewsRouter.get("/user/:userId", reviewsController.getReviewsByUser)

/**
 * PUT /reviews/:id
 * Update a review (only if the user is the author)
 */
reviewsRouter.put(
  "/:id",
  checkProvidedTokenIsValid,
  checkUserIsAuthorized,
  validateReviewData,
  reviewsController.updateReview
)

/**
 * DELETE /reviews/:id
 * Delete a review (only if the user is the author)
 */
reviewsRouter.delete(
  "/:id",
  checkProvidedTokenIsValid,
  checkUserIsAuthorized,
  reviewsController.deleteReview
)

/*************************************************** Module Export ******************************************************/
module.exports = { reviewsRouter }
