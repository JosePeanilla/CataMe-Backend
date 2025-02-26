const mongoose = require("mongoose")
const { WineModel } = require("./WineModel.js")

/* Service which interacts with the 'wine' database */
const winesService = {
  createWine: async (providedWineArgs) => {
    try {
      ("Winery ID recibido en createWine:", providedWineArgs.winery);
      const newWine = await WineModel.create(providedWineArgs);
      if (!newWine) throw new Error("Failed to create wine");
      return newWine;
    } catch (error) {
      throw new Error(error.message);
    }
},

  deleteWine: async ({ id }) => {
    try {
      const deletedWine = await WineModel.findByIdAndDelete(id)
      if (!deletedWine) throw new Error(`No wine found with ID '${id}'`)
      return deletedWine
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getAllWines: async () => {
    return await WineModel.find()
    .populate("region", "name")
    .populate("winery", "name")
    .sort({ createdAt: -1 })
  },

  getWineById: async ({ id }) => {
    try {
      const wine = await WineModel.findById(id)
      .populate("region", "name")
      .populate("winery", "name")
      if (!wine) throw new Error(`No wine found with ID '${id}'`)
      return wine
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getWinesByWinery: async (wineryId) => {
    try {
      const wines = await WineModel.find({ winery: new mongoose.Types.ObjectId(wineryId) })
      .populate("region", "name")
      .populate("winery", "name")
      return wines;
    } catch (error) {
      throw new Error(error.message)
    }
  },
  
  updateWine: async ({ id, ...wineArgs }) => {
    try {
      const updatedWine = await WineModel.findByIdAndUpdate(id, wineArgs, {
        new: true,
      })
      .populate("region", "name")
      .populate("winery", "name")
      if (!updatedWine) throw new Error(`No wine found with ID '${id}'`)
      return updatedWine
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

/*************************************************** Module export ****************************************************/
module.exports = { winesService }