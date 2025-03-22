const mongoose = require("mongoose")
const { winesService } = require("./winesService.js")
const { statusCodes } = require("../constants/statusCodes.js")

const winesController = {
  getAllWines: async (req, res) => {
    try {
      const { name, type, grapeType, region, winery, minPrice, maxPrice, minYear, maxYear, minRating } = req.query
      const wines = await winesService.getAllWines({ name, type, grapeType, region, winery, minPrice, maxPrice, minYear, maxYear, minRating })
      res
        .status(statusCodes.OK)
        .json({ message: "Wines retrieved successfully!", data: wines })
    } catch (error) {
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  getWineById: async (req, res) => {
    try {
      const { id } = req.params
      const wine = await winesService.getWineById({ id })
      res
        .status(statusCodes.OK)
        .json({ message: "Wine retrieved successfully!", data: wine })
    } catch (error) {
      res.status(statusCodes.NotFound).json({ error: error.message })
    }
  },

  getWinesByWinery: async (req, res) => {
    try {
      const { wineryId } = req.params
      if (!mongoose.Types.ObjectId.isValid(wineryId)) {
        return res.status(statusCodes.BadRequest).json({ error: "Invalid winery ID" })
      }
      const wines = await winesService.getWinesByWinery(wineryId)
      res.status(statusCodes.OK).json({ message: "Wines retrieved successfully!", data: wines })
    } catch (error) {
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  createWine: async (req, res) => {
    try {
      const newWine = await winesService.createWine(req.body)
      res
        .status(statusCodes.Created)
        .json({ message: "Wine created successfully!", data: newWine })
    } catch (error) {
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  updateWine: async (req, res) => {
    try {
      const { id } = req.params
      const updatedWine = await winesService.updateWine({ id, ...req.body })
      res
        .status(statusCodes.OK)
        .json({ message: "Wine updated successfully!", data: updatedWine })
    } catch (error) {
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  deleteWine: async (req, res) => {
    try {
      const { id } = req.params
      const deletedWine = await winesService.deleteWine({ id })
      res
        .status(statusCodes.OK)
        .json({ message: "Wine deleted successfully!", data: deletedWine })
    } catch (error) {
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  filterWines: async (req, res) => {
    try {
      const filters = req.query
      const wines = await winesService.filterWines(filters)
      res.status(statusCodes.OK).json({ message: "Wines retrieved successfully!", data: wines })
    } catch (error) {
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },
}

/*************************************************** Module export ****************************************************/
module.exports = { winesController }
