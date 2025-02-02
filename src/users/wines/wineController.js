const { wineService } = require("./wineService.js");

const wineController = {
  getAllWines: async (req, res) => {
    try {
      const wines = await wineService.getAllWines();
      res
        .status(200)
        .json({ message: "Wines retrieved successfully!", data: wines });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getWineById: async (req, res) => {
    try {
      const { id } = req.params;
      const wine = await wineService.getWineById({ id });
      res
        .status(200)
        .json({ message: "Wine retrieved successfully!", data: wine });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  createWine: async (req, res) => {
    try {
      const newWine = await wineService.createWine(req.body);
      res
        .status(201)
        .json({ message: "Wine created successfully!", data: newWine });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateWine: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedWine = await wineService.updateWine({ id, ...req.body });
      res
        .status(200)
        .json({ message: "Wine updated successfully!", data: updatedWine });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteWine: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedWine = await wineService.deleteWine({ id });
      res
        .status(200)
        .json({ message: "Wine deleted successfully!", data: deletedWine });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { wineController };
