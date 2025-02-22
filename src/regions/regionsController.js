const { regionsService } = require("./regionsService.js")

const regionsController = {
  getAllRegions: async (req, res) => {
    try {
      const regions = await regionsService.getAllRegions()
      res
        .status(200)
        .json({ message: "Regions retrieved successfully!", data: regions })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getRegionById: async (req, res) => {
    try {
      const { id } = req.params
      const region = await regionsService.getRegionById({ id })
      res
        .status(200)
        .json({ message: "Region retrieved successfully!", data: region })
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  },

  createRegion: async (req, res) => {
    try {
      const newRegion = await regionsService.createRegion(req.body)
      res
        .status(201)
        .json({ message: "Region created successfully!", data: newRegion })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  updateRegion: async (req, res) => {
    try {
      const { id } = req.params
      const updatedRegion = await regionsService.updateRegion({ id, ...req.body })
      res
        .status(200)
        .json({ message: "Region updated successfully!", data: updatedRegion })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  deleteRegion: async (req, res) => {
    try {
      const { id } = req.params
      const deletedRegion = await regionsService.deleteRegion({ id })
      res
        .status(200)
        .json({ message: "Region deleted successfully!", data: deletedRegion })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

/*************************************************** Module export ****************************************************/
module.exports = { regionsController }
