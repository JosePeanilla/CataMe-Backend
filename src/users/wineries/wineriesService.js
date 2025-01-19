const { WineryModel } = require("./WineryModel.js")  /* Model of 'winery users' entity */

/* Service which interacts with the 'winery user' database */
const wineriesService = {
  createWinery: async (providedWineryArgs) => {
    try {
      const newWinery = await WineryModel.create(providedWineryArgs)
      if (newWinery) return newWinery
      else throw new Error(`Database returned '${newWinery}' when trying to create a Winery user with provided args!`)
    } catch (error) {
      throw error
    }
  },
  deleteWinery: async ({ id }) => {
    try {
      const deletedWinery = await WineryModel.findByIdAndDelete(id)
      if (deletedWinery) return deletedWinery
      else throw new Error(`Database returned '${deletedWinery}' when trying to delete a Winery user with '${id}' ID!`)
    } catch (error) {
      throw error
    }
  },
  getAllWineries: async () => {
    return await WineryModel.find()
  },
  updateWinery: async ({ id, ...wineryArgs }) => {
    try {
      const updatedWinery = await WineryModel.findByIdAndUpdate(id, wineryArgs, { new: true })
      if (updatedWinery) return updatedWinery
      else throw new Error(`Database returned '${updatedWinery}' when trying to update a Winery user with '${id}' ID!`)
    } catch (error) {
      throw error
    }
  },
  updateWineryField: async ({ id, field_name, field_value }) => {
    try {
      const updatedWinery = await WineryModel.findByIdAndUpdate(id, { [field_name]: field_value }, { new: true })
      if (updatedWinery) return updatedWinery
      else throw new Error(`Database returned '${updatedWinery}' when trying to update a Winery user '${field_name}' field with '${id}' ID!`)
    } catch (error) {
      throw error
    }
  }
}

module.exports = { wineriesService }
