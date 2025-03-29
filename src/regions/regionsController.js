/************************************************** Internal Logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries *************************************************/
const { regionsService } = require("./regionsService.js")
const { statusCodes } = require("../constants/statusCodes.js")

/*********************************************** Regions Controller: Request Handlers *********************************/
/**
 * Handles HTTP request/response logic for wine regions.
 */

const regionsController = {
  /**
   * GET /regions
   * Retrieve all regions
   */
  getAllRegions: async (req, res) => {
    try {
      const regions = await regionsService.getAllRegions()
      const msg = "Regions retrieved successfully!"
      logger.debug(msg)
      res.status(statusCodes.OK).json({ message: msg, data: regions })
    } catch (error) {
      const errorText = "Failed to retrieve regions!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  /**
   * GET /regions/:id
   * Retrieve a region by ID
   */
  getRegionById: async (req, res) => {
    try {
      const { id } = req.params
      const region = await regionsService.getRegionById({ id })
      const msg = "Region retrieved successfully!"
      logger.debug(msg)
      res.status(statusCodes.OK).json({ message: msg, data: region })
    } catch (error) {
      const errorText = "Region could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.NotFound).json({ error: error.message })
    }
  },

  /**
   * POST /regions
   * Create a new region
   */
  createRegion: async (req, res) => {
    try {
      const newRegion = await regionsService.createRegion(req.body)
      const msg = "Region created successfully!"
      logger.debug(msg)
      res.status(statusCodes.Created).json({ message: msg, data: newRegion })
    } catch (error) {
      const errorText = "Region could not be created!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  /**
   * PUT /regions/:id
   * Update an existing region
   */
  updateRegion: async (req, res) => {
    try {
      const { id } = req.params
      const updatedRegion = await regionsService.updateRegion({ id, ...req.body })
      const msg = "Region updated successfully!"
      logger.debug(msg)
      res.status(statusCodes.OK).json({ message: msg, data: updatedRegion })
    } catch (error) {
      const errorText = "Region could not be updated!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  /**
   * DELETE /regions/:id
   * Delete a region
   */
  deleteRegion: async (req, res) => {
    try {
      const { id } = req.params
      const deletedRegion = await regionsService.deleteRegion({ id })
      const msg = "Region deleted successfully!"
      logger.debug(msg)
      res.status(statusCodes.OK).json({ message: msg, data: deletedRegion })
    } catch (error) {
      const errorText = "Region could not be deleted!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },
}

/*************************************************** Module Export ****************************************************/
module.exports = { regionsController }
