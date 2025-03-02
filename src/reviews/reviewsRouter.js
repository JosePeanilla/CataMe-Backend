/************************************************ Node modules needed *************************************************/
/* Used to create an ExpressJS router */
const express = require("express")

/********************************************** ExpressJS router object ***********************************************/
const reviewsRouter = express.Router()

/**************************************************** Middlewares *****************************************************/
const { validateReviewData, checkUserHasNotReviewed } = require("./reviewsMiddlewares.js")
const { checkProvidedTokenIsValid, checkUserIsAuthorized } = require("../auth/authMiddlewares.js")

/***************************************************** Endpoints ******************************************************/
const { reviewsController } = require("./reviewsController.js")

/* /reviews/ */
reviewsRouter.post('/',
    checkProvidedTokenIsValid,
    checkUserHasNotReviewed,
    validateReviewData,
    reviewsController.createReview
)

reviewsRouter.get("/", reviewsController.getAllReviews)

reviewsRouter.get("/:id", reviewsController.getReviewById)

reviewsRouter.get("/wine/:wineId", reviewsController.getReviewsByWine)

reviewsRouter.get("/user/:userId", reviewsController.getReviewsByUser)

reviewsRouter.put(
    "/:id",
    checkProvidedTokenIsValid,
    checkUserIsAuthorized, 
    validateReviewData,
    reviewsController.updateReview
  )

  reviewsRouter.delete(
    "/:id",
    checkProvidedTokenIsValid,
    checkUserIsAuthorized, 
    reviewsController.deleteReview
  )

  /*************************************************** Module export ****************************************************/
  module.exports = { reviewsRouter }
  