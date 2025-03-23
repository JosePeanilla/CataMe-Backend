const { regionsService } = require("./regionsService.js")
const { statusCodes } = require("../constants/statusCodes.js")

const regionsController = {
  getAllRegions: async (req, res) => {
    try {
      const regions = await regionsService.getAllRegions()
      res
        .status(statusCodes.OK)
        .json({ message: "Regions retrieved successfully!", data: regions })
    } catch (error) {
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  getRegionById: async (req, res) => {
    try {
      const { id } = req.params
      const region = await regionsService.getRegionById({ id })
      res
        .status(statusCodes.OK)
        .json({ message: "Region retrieved successfully!", data: region })
    } catch (error) {
      res.status(statusCodes.NotFound).json({ error: error.message })
    }
  },

  getWinesByRegion: async (req, res) => {
    try {
      const { regionName } = req.params;
      const wines = await regionsService.getWinesByRegion(regionName);

      if (!wines.length) {
        return res.status(404).json({ error: "No se encontraron vinos para esta región" });
      }

      res.status(200).json({ data: wines });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createRegion: async (req, res) => {
    try {
      const newRegion = await regionsService.createRegion(req.body)
      res
        .status(statusCodes.Created)
        .json({ message: "Region created successfully!", data: newRegion })
    } catch (error) {
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  updateRegion: async (req, res) => {
    try {
      const { id } = req.params
      const updatedRegion = await regionsService.updateRegion({ id, ...req.body })
      res
        .status(statusCodes.OK)
        .json({ message: "Region updated successfully!", data: updatedRegion })
    } catch (error) {
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },

  deleteRegion: async (req, res) => {
    try {
      const { id } = req.params
      const deletedRegion = await regionsService.deleteRegion({ id })
      res
        .status(statusCodes.OK)
        .json({ message: "Region deleted successfully!", data: deletedRegion })
    } catch (error) {
      res.status(statusCodes.InternalServerError).json({ error: error.message })
    }
  },
}

module.exports = { regionsController }
