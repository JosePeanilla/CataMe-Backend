const { RegionModel } = require("./RegionModel.js")
const { WineModel } = require("../wines/WineModel.js")

/* Service which interacts with the 'wine' database */
const regionsService = {
  createRegion: async (providedRegionArgs) => {
    try {
      const newRegion = await RegionModel.create(providedRegionArgs)
      if (!newRegion) throw new Error("Failed to create region")
      return newRegion
    } catch (error) {
      throw new Error(error.message)
    }
  },

  deleteRegion: async ({ id }) => {
    try {
      const deletedRegion = await RegionModel.findByIdAndDelete(id)
      if (!deletedRegion) throw new Error(`No region found with ID '${id}'`)
      return deletedRegion
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getAllRegions: async () => {
    return await RegionModel.find().sort({ name: 1 })
  },

  getRegionById: async ({ id }) => {
    try {
      const region = await RegionModel.findById(id)
      if (!region) throw new Error(`No region found with ID '${id}'`)

        if (!region.image) {
            region.image = "https://via.placeholder.com/600x400"
        }
        
      return region
    } catch (error) {
      throw new Error(error.message)
    }
  },

  updateRegion: async ({ id, ...regionArgs }) => {
    try {
      const updatedRegion = await RegionModel.findByIdAndUpdate(id, regionArgs, {
        new: true,
      })
      if (!updatedRegion) throw new Error(`No region found with ID '${id}'`)
      return updatedRegion
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

/*************************************************** Module export ****************************************************/
module.exports = { regionsService }
