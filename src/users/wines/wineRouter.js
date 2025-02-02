const express = require("express");

const wineRouter = express.Router();

const { validateWineData } = require("./wineMiddlewares.js");
const { wineController } = require("./wineController.js");

wineRouter.get("/", wineController.getAllWines);
wineRouter.post("/", validateWineData, wineController.createWine);

wineRouter.get("/:id", wineController.getWineById);
wineRouter.put("/:id", wineController.updateWine);
wineRouter.delete("/:id", wineController.deleteWine);

module.exports = { wineRouter };
