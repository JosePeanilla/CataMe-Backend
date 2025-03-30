/*********************************************** External Dependencies ***************************************************/
const express = require("express")

/******************************************************* Logger **********************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/******************************************************** Models *********************************************************/
const { WineModel } = require("./WineModel.js")
const { RegionModel } = require("../regions/RegionModel.js")

/****************************************************** Middleware *******************************************************/
const { validateWineData } = require("./winesMiddlewares.js")
const { checkProvidedTokenIsValid, checkWineryRole } = require("../auth/authMiddlewares.js")

/****************************************************** Controllers ******************************************************/
const { winesController } = require("./winesController.js")

/**************************************************** Router Instance ****************************************************/
const winesRouter = express.Router()

/************************************** Public Endpoints (No Auth Required) *********************************************/

/**
 * GET /wines
 * Get all wines with optional filters
 */
winesRouter.get("/", (req, res, next) => {
  logger.info("GET /wines - Fetching all wines")
  winesController.getAllWines(req, res, next)
})

/**
 * GET /wines/winery/:wineryId
 * Get wines for a specific winery
 */
winesRouter.get("/winery/:wineryId", (req, res, next) => {
  logger.info(`GET /wines/winery/${req.params.wineryId} - Fetching wines by winery`)
  winesController.getWinesByWinery(req, res, next)
})

/**
 * GET /wines/region/:regionName
 * Get wines for a specific region
 */
winesRouter.get("/region/:regionName", (req, res, next) => {
  logger.info(`GET /wines/region/${req.params.regionName} - Fetching wines by region`)
  winesController.getWinesByRegion(req, res, next)
})

/**
 * GET /wines/:id
 * Get a single wine by its ID
 */
winesRouter.get("/:id", (req, res, next) => {
  logger.info(`GET /wines/${req.params.id} - Fetching wine by ID`)
  winesController.getWineById(req, res, next)
})

/*********************************************** Protected Endpoints *****************************************************/

/**
 * POST /wines
 * Create a new wine (only for authenticated wineries)
 */
winesRouter.post(
  "/",
  checkProvidedTokenIsValid,
  checkWineryRole,
  validateWineData,
  (req, res, next) => {
    logger.info(`POST /wines - Creating wine for winery ID: ${res.locals.loggedUserToken.id}`)
    winesController.createWine(req, res, next)
  }
)

/**
 * PUT /wines/:id
 * Update a wine by ID (only for authenticated wineries)
 */
winesRouter.put(
  "/:id",
  checkProvidedTokenIsValid,
  checkWineryRole,
  (req, res, next) => {
    logger.info(`PUT /wines/${req.params.id} - Updating wine`)
    winesController.updateWine(req, res, next)
  }
)

/**
 * DELETE /wines/:id
 * Delete a wine by ID (only for authenticated wineries)
 */
winesRouter.delete(
  "/:id",
  checkProvidedTokenIsValid,
  checkWineryRole,
  (req, res, next) => {
    logger.info(`DELETE /wines/${req.params.id} - Deleting wine`)
    winesController.deleteWine(req, res, next)
  }
)

/*************************************************** Module Export ******************************************************/
module.exports = { winesRouter }
