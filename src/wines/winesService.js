const { WineModel } = require("./WineModel.js")

/* Service which interacts with the 'wine' database */
const winesService = {
  createWine: async (providedWineArgs) => {
    try {
      const newWine = await WineModel.create(providedWineArgs)
      if (!newWine) throw new Error("Failed to create wine")
      return newWine
    } catch (error) {
      throw new Error(error.message)
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
