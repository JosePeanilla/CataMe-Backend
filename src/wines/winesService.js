const mongoose = require("mongoose")
const { WineModel } = require("./WineModel.js")

/* Service which interacts with the 'wine' database */
const winesService = {
  createWine: async (providedWineArgs) => {
    try {
      console.log("Winery ID recibido en createWine:", providedWineArgs.winery);
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
  },

  getWineById: async ({ id }) => {
    try {
      const wine = await WineModel.findById(id)
      if (!wine) throw new Error(`No wine found with ID '${id}'`)
      return wine
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getWinesByWinery: async (wineryId) => {
    try {
      console.log("Winery ID recibido:", wineryId)
      const wines = await WineModel.find({ winery: new mongoose.Types.ObjectId(wineryId) }).populate("winery")
      console.log("Vinos encontrados:", wines)
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
      if (!updatedWine) throw new Error(`No wine found with ID '${id}'`)
      return updatedWine
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

/*************************************************** Module export ****************************************************/
module.exports = { winesService }