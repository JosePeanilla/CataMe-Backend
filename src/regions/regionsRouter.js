/*********************************************** Node Modules Needed ****************************************************/
/* Used to create an ExpressJS router */
const express = require("express")

/********************************************** ExpressJS Router Object *************************************************/
const regionsRouter = express.Router()

/**************************************************** Middlewares *******************************************************/
/* Middleware for validating region input data */
const { validateRegionData } = require("./regionsMiddlewares.js")

/***************************************************** Controller *******************************************************/
/* Controller for handling region-related requests */
const { regionsController } = require("./regionsController.js")

/*********************************************** Regions Routes (RESTful API) *******************************************/

/**
 * GET /regions
 * Retrieve a list of all regions
 */
regionsRouter.get("/", regionsController.getAllRegions)

/**
 * POST /regions
 * Create a new region (with validation)
 */
regionsRouter.post("/", validateRegionData, regionsController.createRegion)

/**
 * GET /regions/:id
 * Retrieve details of a specific region by ID
 */
regionsRouter.get("/:id", regionsController.getRegionById)

/**
 * PUT /regions/:id
 * Update an existing region by ID
 */
regionsRouter.put("/:id", regionsController.updateRegion)

/**
 * DELETE /regions/:id
 * Delete a region by ID
 */
regionsRouter.delete("/:id", regionsController.deleteRegion)

/*************************************************** Module Export ******************************************************/
module.exports = { regionsRouter }
