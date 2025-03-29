/*********************************************** External Dependencies ***************************************************/
const mongoose = require("mongoose")

/******************************************************* Services ********************************************************/
const { winesService } = require("./winesService.js")

/**************************************************** Status Codes *******************************************************/
const { statusCodes } = require("../constants/statusCodes.js")

/******************************************************** Logger *********************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/******************************************* Wine Controller: Route Handlers *********************************************/
/**
 * This controller acts as the interface between routes and the wine service.
 * It handles request/response formatting, status codes, and error catching.
 */

const winesController = {
  /**
   * GET /wines
   * Retrieve all wines with optional query filters
   */
  getAllWines: async (req, res) => {
    try {
      const { name, type, grapeType, region, winery, minPrice, maxPrice, minYear, maxYear, minRating } = req.query
      logger.info("Retrieving all wines with filters:", req.query)
      const wines = await winesService.getAllWines({ name, type, grapeType, region, winery, minPrice, maxPrice, minYear, maxYear, minRating })
      res.status(statusCodes.OK).json({ message: "Wines retrieved successfully!", data: wines })
    } catch (error) {
      logger.error("Error retrieving wines:", error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  /**
   * GET /wines/:id
   * Retrieve a single wine by its ID
   */
  getWineById: async (req, res) => {
    try {
      const { id } = req.params
      logger.info(`Retrieving wine by ID: ${id}`)
      const wine = await winesService.getWineById({ id })
      res.status(statusCodes.OK).json({ message: "Wine retrieved successfully!", data: wine })
    } catch (error) {
      logger.error(`Error retrieving wine with ID '${req.params.id}':`, error)
      res.status(statusCodes.NotFound).json({ error: error.message })
    }
  },

  /**
   * GET /wines/winery/:wineryId
   * Retrieve wines belonging to a specific winery
   */
  getWinesByWinery: async (req, res) => {
    try {
      const { wineryId } = req.params
      logger.info(`Retrieving wines by winery ID: ${wineryId}`)

      if (!mongoose.Types.ObjectId.isValid(wineryId)) {
        logger.warn(`Invalid winery ID: ${wineryId}`)
        return res.status(statusCodes.BadRequest).json({ error: "Invalid winery ID" })
      }

      const wines = await winesService.getWinesByWinery(wineryId)
      res.status(statusCodes.OK).json({ message: "Wines retrieved successfully!", data: wines })
    } catch (error) {
      logger.error("Error retrieving wines by winery:", error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  /**
   * GET /wines/region/:regionName
   * Retrieve wines from a specific region
   */
  getWinesByRegion: async (req, res) => {
    try {
      const { regionName } = req.params
      logger.info(`Retrieving wines by region: ${regionName}`)
      const wines = await winesService.getWinesByRegion(regionName)

      if (!wines.length) {
        logger.warn(`No wines found for region: ${regionName}`)
        return res.status(statusCodes.NotFound).json({ error: "No se encontraron vinos para esta región" })
      }

      res.status(statusCodes.OK).json({ data: wines })
    } catch (error) {
      logger.error(`Error retrieving wines for region '${req.params.regionName}':`, error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  /**
   * POST /wines
   * Create a new wine
   */
  createWine: async (req, res) => {
    try {
      logger.info("Creating a new wine:", req.body)
      const newWine = await winesService.createWine(req.body)
      res.status(statusCodes.Created).json({ message: "Wine created successfully!", data: newWine })
    } catch (error) {
      logger.error("Error creating wine:", error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  /**
   * PUT /wines/:id
   * Update an existing wine
   */
  updateWine: async (req, res) => {
    try {
      const { id } = req.params
      logger.info(`Updating wine with ID: ${id}`)
      const updatedWine = await winesService.updateWine({ id, ...req.body })
      res.status(statusCodes.OK).json({ message: "Wine updated successfully!", data: updatedWine })
    } catch (error) {
      logger.error(`Error updating wine with ID '${req.params.id}':`, error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  /**
   * DELETE /wines/:id
   * Delete a wine by its ID
   */
  deleteWine: async (req, res) => {
    try {
      const { id } = req.params
      logger.info(`Deleting wine with ID: ${id}`)
      const deletedWine = await winesService.deleteWine({ id })
      res.status(statusCodes.OK).json({ message: "Wine deleted successfully!", data: deletedWine })
    } catch (error) {
      logger.error(`Error deleting wine with ID '${req.params.id}':`, error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  /**
   * GET /wines/filter
   * Filter wines (optional endpoint, if implemented)
   */
  filterWines: async (req, res) => {
    try {
      logger.info("Filtering wines with parameters:", req.query)
      const filters = req.query
      const wines = await winesService.filterWines(filters)
      res.status(statusCodes.OK).json({ message: "Wines retrieved successfully!", data: wines })
    } catch (error) {
      logger.error("Error filtering wines:", error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },
}

/*************************************************** Module Export ******************************************************/
module.exports = { winesController }
