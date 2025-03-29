/*********************************************** External Dependencies ***************************************************/
const mongoose = require("mongoose")

/******************************************************* Logger **********************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/***************************************************** Models *************************************************************/
const { WineModel } = require("./WineModel.js") 
const { RegionModel } = require("../regions/RegionModel.js")
const { WineryModel } = require("../users/wineries/WineryModel.js")

/*************************************** Wine Service: Business Logic Layer **********************************************/
/**
 * This service handles all data operations related to wines.
 * It connects to MongoDB models to create, update, delete, and fetch wines,
 * including filtering, sorting, and populating relationships like region, winery, and reviews.
 */

const winesService = {
  /*********************************************** Create a New Wine ****************************************************/
  createWine: async (providedWineArgs) => {
    try {
      logger.info(`Creating new wine for winery ID: ${providedWineArgs.winery}`)
      const newWine = await WineModel.create(providedWineArgs)
      if (!newWine) throw new Error("Failed to create wine")
      logger.info(`Wine created with ID: ${newWine._id}`)
      return newWine
    } catch (error) {
      logger.error("Error creating wine:", error)
      throw new Error(error.message)
    }
  },

  /*********************************************** Delete Wine by ID ****************************************************/
  deleteWine: async ({ id }) => {
    try {
      logger.info(`Deleting wine with ID: ${id}`)
      const deletedWine = await WineModel.findByIdAndDelete(id)
      if (!deletedWine) throw new Error(`No wine found with ID '${id}'`)
      logger.info(`Wine deleted with ID: ${id}`)
      return deletedWine
    } catch (error) {
      logger.error(`Error deleting wine with ID '${id}':`, error)
      throw new Error(error.message)
    }
  },

  /************************************** Get All Wines with Optional Filters ********************************************/
  getAllWines: async (filters = {}) => {
    try {
      logger.info("Fetching all wines with filters:", filters)
      const query = {}

      if (filters.name) query.name = { $regex: filters.name, $options: "i" }
      if (filters.type) query.type = filters.type
      if (filters.grapeType) query.grapeType = { $regex: filters.grapeType, $options: "i" }

      if (filters.region) {
        const regionDoc = await RegionModel.findOne({ name: { $regex: filters.region, $options: "i" } })
        if (regionDoc) {
          query.region = regionDoc._id
        } else {
          logger.warn(`Region not found: ${filters.region}`)
          return []
        }
      }

      if (filters.winery) {
        const wineryDoc = await WineryModel.findOne({ name: { $regex: filters.winery.trim(), $options: "i" } })
        if (wineryDoc) {
          query.winery = wineryDoc._id
        } else {
          logger.warn(`Winery not found: ${filters.winery}`)
          return []
        }
      }

      if (filters.minPrice) query.price = { ...query.price, $gte: Number(filters.minPrice) }
      if (filters.maxPrice) query.price = { ...query.price, $lte: Number(filters.maxPrice) }
      if (filters.minYear) query.year = { ...query.year, $gte: Number(filters.minYear) }
      if (filters.maxYear) query.year = { ...query.year, $lte: Number(filters.maxYear) }

      const wines = await WineModel.find(query)
        .populate("region")
        .populate("winery", "name")
        .populate({
          path: "reviews",
          model: "Review",
          select: "rating comment user",
          populate: { path: "user", select: "name surname" },
        })
        .sort({ createdAt: -1 })

      const winesWithRatings = wines.map((wine) => {
        const totalReviews = wine.reviews.length
        const avgRating = totalReviews > 0
          ? wine.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
          : 0
        return { ...wine.toObject(), averageRating: avgRating.toFixed(1) }
      })

      if (filters.minRating) {
        return winesWithRatings.filter(wine => wine.averageRating >= Number(filters.minRating))
      }

      return winesWithRatings
    } catch (error) {
      logger.error("Error fetching wines:", error)
      throw new Error(error.message)
    }
  },

  /*********************************************** Get Wine by ID ********************************************************/
  getWineById: async ({ id }) => {
    try {
      logger.info(`Fetching wine with ID: ${id}`)
      const wine = await WineModel.findById(id)
        .populate("region")
        .populate("winery", "name")
        .populate("reviews", "rating createdAt")
        .sort({ "reviews.createdAt": -1 })

      if (!wine) {
        logger.warn(`Wine not found with ID: ${id}`)
        throw new Error(`No wine found with ID '${id}'`)
      }

      const totalReviews = wine.reviews.length
      const avgRating = totalReviews
        ? wine.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0

      return { ...wine.toObject(), averageRating: avgRating.toFixed(1) }
    } catch (error) {
      logger.error(`Error fetching wine with ID '${id}':`, error)
      throw new Error(error.message)
    }
  },

  /******************************************** Get Wines by Winery ID ***************************************************/
  getWinesByWinery: async (wineryId) => {
    try {
      logger.info(`Fetching wines for winery ID: ${wineryId}`)
      const wines = await WineModel.find({ winery: new mongoose.Types.ObjectId(wineryId) })
        .populate("region")
        .populate("winery", "name")
        .populate("reviews", "rating createdAt")
        .sort({ "reviews.createdAt": -1 })

      const winesWithRatings = wines.map(wine => {
        const totalReviews = wine.reviews.length
        const avgRating = totalReviews > 0
          ? wine.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
          : 0
        return { ...wine.toObject(), averageRating: avgRating.toFixed(1) }
      })

      return winesWithRatings
    } catch (error) {
      logger.error(`Error fetching wines for winery ID '${wineryId}':`, error)
      throw new Error(error.message)
    }
  },

  /******************************************* Get Wines by Region Name **************************************************/
  getWinesByRegion: async (regionName) => {
    try {
      logger.info(`Fetching wines for region: ${regionName}`)
      const region = await RegionModel.findOne({ name: regionName })
      if (!region) {
        logger.warn(`Region not found: ${regionName}`)
        throw new Error("Región no encontrada")
      }

      return await WineModel.find({ region: region._id })
        .populate("region")
        .populate("winery", "name")
        .populate({
          path: "reviews",
          model: "Review",
          select: "rating comment user",
          populate: { path: "user", select: "name surname" },
        })
        .sort({ "reviews.createdAt": -1 })
    } catch (error) {
      logger.error(`Error fetching wines by region '${regionName}':`, error)
      throw new Error(error.message)
    }
  },

  /*********************************************** Update Wine by ID *****************************************************/
  updateWine: async ({ id, ...wineArgs }) => {
    try {
      logger.info(`Updating wine with ID: ${id}`)
      const updatedWine = await WineModel.findByIdAndUpdate(id, wineArgs, {
        new: true,
      })
        .populate("region")
        .populate("winery", "name")
        .populate("reviews", "rating createdAt")
        .sort({ "reviews.createdAt": -1 })

      if (!updatedWine) {
        logger.warn(`Wine not found for update with ID: ${id}`)
        throw new Error(`No wine found with ID '${id}'`)
      }

      const totalReviews = updatedWine.reviews.length
      const avgRating = totalReviews > 0
        ? updatedWine.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0

      return { ...updatedWine.toObject(), averageRating: avgRating.toFixed(1) }
    } catch (error) {
      logger.error(`Error updating wine with ID '${id}':`, error)
      throw new Error(error.message)
    }
  },
}

/*************************************************** Module Export ******************************************************/
module.exports = { winesService }
