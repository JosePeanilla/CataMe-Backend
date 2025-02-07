const express = require("express");

const winesRouter = express.Router();

const { validateWineData } = require("./winesMiddlewares.js");
const { winesController } = require("./winesController.js");

winesRouter.get("/", winesController.getAllWines);
winesRouter.post("/", validateWineData, winesController.createWine);

winesRouter.get("/:id", winesController.getWineById);
winesRouter.put("/:id", winesController.updateWine);
winesRouter.delete("/:id", winesController.deleteWine);

module.exports = { winesRouter };
