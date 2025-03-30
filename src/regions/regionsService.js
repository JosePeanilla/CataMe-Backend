/*********************************************** Internal Logger ********************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/*********************************************** Internal Models ********************************************************/
/* MongoDB models for regions and wines */
const { RegionModel } = require("./RegionModel.js")
const { WineModel } = require("../wines/WineModel.js")

/*********************************************** Regions Service: Business Logic Layer **********************************/
/**
 * Handles all operations related to wine-producing regions,
 * including creation, updates, retrieval, and deletion.
 */

const regionsService = {
  /**
   * Create a new region
   */
  createRegion: async (providedRegionArgs) => {
    try {
      const newRegion = await RegionModel.create(providedRegionArgs)
      if (!newRegion) throw new Error("Failed to create region")
      logger.debug("Region created successfully")
      return newRegion
    } catch (error) {
      logger.error("Error creating region", error)
      throw new Error(error.message)
    }
  },

  /**
   * Delete a region by ID
   */
  deleteRegion: async ({ id }) => {
    try {
      const deletedRegion = await RegionModel.findByIdAndDelete(id)
      if (!deletedRegion) throw new Error(`No region found with ID '${id}'`)
      logger.debug(`Region with ID '${id}' deleted successfully`)
      return deletedRegion
    } catch (error) {
      logger.error("Error deleting region", error)
      throw new Error(error.message)
    }
  },

  /**
   * Retrieve all regions, sorted alphabetically by name
   */
  getAllRegions: async () => {
    try {
      const regions = await RegionModel.find().sort({ name: 1 })
      logger.debug("All regions retrieved successfully")
      return regions
    } catch (error) {
      logger.error("Error retrieving all regions", error)
      throw new Error("Failed to retrieve regions")
    }
  },

  /**
   * Get a single region by ID
   * If the region doesn't have an image, a placeholder image is added
   */
  getRegionById: async ({ id }) => {
    try {
      const region = await RegionModel.findById(id)
      if (!region) throw new Error(`No region found with ID '${id}'`)

      if (!region.image) {
        region.image = "https://via.placeholder.com/600x400"
      }

      logger.debug(`Region with ID '${id}' retrieved successfully`)
      return region
    } catch (error) {
      logger.error(`Error retrieving region with ID '${id}'`, error)
      throw new Error(error.message)
    }
  },

  /**
   * Update region data by ID
   */
  updateRegion: async ({ id, ...regionArgs }) => {
    try {
      const updatedRegion = await RegionModel.findByIdAndUpdate(id, regionArgs, {
        new: true,
      })
      if (!updatedRegion) throw new Error(`No region found with ID '${id}'`)
      logger.debug(`Region with ID '${id}' updated successfully`)
      return updatedRegion
    } catch (error) {
      logger.error(`Error updating region with ID '${id}'`, error)
      throw new Error(error.message)
    }
  },
}

/*************************************************** Module Export ******************************************************/
module.exports = { regionsService }
