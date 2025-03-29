/*********************************************** Node Modules Needed ****************************************************/
/* Used to create an ExpressJS router */
const express = require("express")

/************************************************** Logger Setup ********************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)

/********************************************** ExpressJS Router Object *************************************************/
const wineriesRouter = express.Router()

/**************************************************** Middlewares *******************************************************/
/* Custom middlewares for winery validation and auth */
const {
  checkAllWineryArgsAreProvided,
  checkProvidedWineryExists,
  checkProvidedWineryFieldIsValid,
  checkUpdateFieldsProvided,
  checkNewValueMatchesConfirmation,
  checkCurrentValueIsCorrect
} = require("./wineriesMiddlewares.js")

const {
  checkProvidedTokenIsValid,
  checkUserIsAuthorized
} = require("../../auth/authMiddlewares.js")

/****************************************************** Controller ******************************************************/
const { wineriesController } = require("./wineriesController.js")

/*********************************************** Public Endpoints (No Auth) **********************************************/

/**
 * GET /users/wineries
 * Retrieve all wineries
 */
wineriesRouter.get('/', (req, res, next) => {
  logger.info("GET /users/wineries - Fetching all wineries")
  wineriesController.getAllWineries(req, res, next)
})

/**
 * POST /users/wineries
 * Create a new winery
 */
wineriesRouter.post('/',
  checkAllWineryArgsAreProvided,
  (req, res, next) => {
    logger.info("POST /users/wineries - Creating new winery")
    wineriesController.createWinery(req, res, next)
  }
)

/********************************************** Protected Routes with ID Param *******************************************/

/* Middleware to protect all /users/wineries/:id routes */
wineriesRouter.use("/:id",
  checkProvidedTokenIsValid,
  checkProvidedWineryExists
)

/**
 * GET /users/wineries/:id
 * Get a specific winery by ID
 */
wineriesRouter.get('/:id', (req, res, next) => {
  logger.info(`GET /users/wineries/${req.params.id} - Fetching winery`)
  wineriesController.getWinery(req, res, next)
})

/**
 * PUT /users/wineries/:id
 * Full update of winery info
 */
wineriesRouter.put('/:id',
  checkUserIsAuthorized,
  checkAllWineryArgsAreProvided,
  (req, res, next) => {
    logger.info(`PUT /users/wineries/${req.params.id} - Updating winery`)
    wineriesController.updateWinery(req, res, next)
  }
)

/**
 * DELETE /users/wineries/:id
 * Delete a winery
 */
wineriesRouter.delete('/:id', (req, res, next) => {
  logger.info(`DELETE /users/wineries/${req.params.id} - Deleting winery`)
  wineriesController.deleteWinery(req, res, next)
})

/********************************************** PATCH: Update Single Field **********************************************/

/**
 * PATCH /users/wineries/:id/:field
 * Update a specific field of a winery
 */
wineriesRouter.patch('/:id/:field',
  checkProvidedTokenIsValid,
  checkUserIsAuthorized,
  checkProvidedWineryFieldIsValid,
  checkUpdateFieldsProvided,
  checkNewValueMatchesConfirmation,
  checkCurrentValueIsCorrect,
  (req, res, next) => {
    logger.info(`PATCH /users/wineries/${req.params.id}/${req.params.field} - Updating single field`)
    wineriesController.updateWineryField(req, res, next)
  }
)

/*************************************************** Module Export ******************************************************/
module.exports = { wineriesRouter }
