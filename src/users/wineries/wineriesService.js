/************************************************** Internal logger ***************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal libraries *************************************************/
/* Model of 'winery users' entity */
const { WineryModel } = require("./WineryModel.js")

/* Service which interacts with the 'winery user' database */
const wineriesService = {
  createWinery: async (providedWineryArgs) => {
    try {
      const existingWinery = await WineryModel.findOne({ email: providedWineryArgs.email });
        if (existingWinery) {
            throw new Error("The user you are trying to register is already registered in the database.");
        }
      const newWinery = await WineryModel.create(providedWineryArgs)
      if (newWinery) return newWinery
      else throw `Database returned '${newWinery}' when trying to create a Winery user with provided args!`
    } catch (error) {
      throw error
    }
  },
  deleteWinery: async ({ id }) => {
    try {
      const deletedWinery = await WineryModel.findByIdAndDelete(id)
      if (deletedWinery) return deletedWinery
      else throw `Database returned '${deletedWinery}' when trying to delete a Winery user with '${id}' ID!`
    } catch (error) {
      throw error
    }
  },
  getAllWineries: async () => {
    try {
      return await WineryModel.find()
    } catch (error) {
      throw new Error("Error retrieving wineries: " + error.message)
    }
  },
  getWineryById: async (id) => {
    try {
      const winery = await WineryModel.findById(id);
      if (!winery) {
        throw new Error(`Winery user with ID '${id}' could not be found!`);
      }
      return winery;
    } catch (error) {
      throw error;
    }
  },
  updateWinery: async ({ id, ...wineryArgs }) => {
    try {
      const currentWinery = await WineryModel.findById(id)
      if (!currentWinery) {
        throw new Error(`Winery user with ID '${id}' could not be found!`)
      }
      const isSameData = Object.keys(wineryArgs).every(
        (key) => currentWinery[key] === wineryArgs[key]
      )
      if (isSameData) {
        throw new Error("No se ha realizado ningún cambio en la información.")
      }
      const updatedWinery = await WineryModel.findByIdAndUpdate(id, wineryArgs, { new: true })
      if (!updatedWinery) {
        throw new Error(`Database returned '${updatedWinery}' when trying to update a Winery user with '${id}' ID!`)
      }
      return updatedWinery
    } catch (error) {
      throw error
    }
  },
  updateWineryField: async ({ id, field_name, field_value }) => {
    try {
        if (!field_value) {
            throw new Error(`Field value for '${field_name}' is undefined!`)
        }
        const currentWinery = await WineryModel.findById(id)
        if (!currentWinery) {
            throw new Error(`Winery user with ID '${id}' could not be found!`)
        }
        if (currentWinery[field_name] === field_value) {
            throw new Error(`The value for '${field_name}' is already set to '${field_value}', no changes made.`)
        }
        logger.debug(`Updating ID: ${id}, Field: ${field_name}, Value: ${field_value}`)
        const updatedWinery = await WineryModel.findByIdAndUpdate(
            id,
            { [field_name]: field_value },
            { new: true }
        )
        if (!updatedWinery) {
            throw new Error(`Database returned '${updatedWinery}' when trying to update a Winery user '${field_name}' field with '${id}' ID!`)
        }
        return updatedWinery
     } catch (error) {
        throw error
    }
 }
}

/*************************************************** Module export ****************************************************/
module.exports = { wineriesService }
