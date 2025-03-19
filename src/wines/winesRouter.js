const express = require("express")
const { WineModel } = require("./WineModel.js")
const { RegionModel } = require("../regions/RegionModel.js")

const winesRouter = express.Router()

const { validateWineData } = require("./winesMiddlewares.js")
const { winesController } = require("./winesController.js")
const { checkProvidedTokenIsValid, checkWineryRole } = require("../auth/authMiddlewares.js")

winesRouter.get("/", winesController.getAllWines)
winesRouter.get('/winery/:wineryId', winesController.getWinesByWinery)
winesRouter.get("/:id", winesController.getWineById)
winesRouter.get("/region/:regionName", async (req, res) => {
    try {
      const { regionName } = req.params;
  
      const region = await RegionModel.findOne({ name: regionName });
  
      if (!region) {
        return res.status(404).json({ error: "Región no encontrada" });
      }
  
      const wines = await WineModel.find({ region: region._id });
  
      res.status(200).json({ data: wines });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });   

winesRouter.post("/", checkProvidedTokenIsValid, checkWineryRole, validateWineData, winesController.createWine)
winesRouter.put("/:id", checkProvidedTokenIsValid, checkWineryRole, winesController.updateWine)
winesRouter.delete("/:id", checkProvidedTokenIsValid, checkWineryRole, winesController.deleteWine)

/*************************************************** Module export ****************************************************/
module.exports = { winesRouter }
