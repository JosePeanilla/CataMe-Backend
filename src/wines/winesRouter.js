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

winesRouter.post("/", checkProvidedTokenIsValid, checkWineryRole, validateWineData, winesController.createWine)
winesRouter.put("/:id", checkProvidedTokenIsValid, checkWineryRole, winesController.updateWine)
winesRouter.delete("/:id", checkProvidedTokenIsValid, checkWineryRole, winesController.deleteWine)

/*************************************************** Module export ****************************************************/
module.exports = { winesRouter }
