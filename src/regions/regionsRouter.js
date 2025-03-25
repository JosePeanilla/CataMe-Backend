const express = require("express")

const regionsRouter = express.Router()

const { validateRegionData } = require("./regionsMiddlewares.js")
const { regionsController } = require("./regionsController.js")

regionsRouter.get("/", regionsController.getAllRegions)
regionsRouter.post("/", validateRegionData, regionsController.createRegion)

regionsRouter.get("/:id", regionsController.getRegionById)
regionsRouter.put("/:id", regionsController.updateRegion)
regionsRouter.delete("/:id", regionsController.deleteRegion)

/*************************************************** Module export ****************************************************/
module.exports = { regionsRouter }