/************************************************** Internal Logger *****************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries ***************************************************/
/* Model of 'winery users' entity */
const { WineryModel } = require("./WineryModel.js")

/*************************************** Wineries Service: Business Logic Layer *****************************************/
/**
 * Handles all database operations related to winery users.
 * This includes creation, retrieval, update, and deletion of winery accounts.
 */

const wineriesService = {
  /**
   * Create a new winery user
   */
  createWinery: async (providedWineryArgs) => {
    try {
      logger.info("Attempting to create winery:", providedWineryArgs.email)

      const existingWinery = await WineryModel.findOne({ email: providedWineryArgs.email })
      if (existingWinery) {
        logger.warn(`Duplicate winery email: ${providedWineryArgs.email}`)
        throw new Error("The user you are trying to register is already registered in the database.")
      }

      const newWinery = await WineryModel.create(providedWineryArgs)
      if (!newWinery) {
        throw new Error("Database returned null when trying to create a Winery user!")
      }

      logger.info(`Winery created successfully with ID: ${newWinery._id}`)
      return newWinery
    } catch (error) {
      logger.error("Error creating winery:", error)
      throw error
    }
  },

  /**
   * Delete a winery by ID
   */
  deleteWinery: async ({ id }) => {
    try {
      logger.info(`Attempting to delete winery with ID: ${id}`)

      const deletedWinery = await WineryModel.findByIdAndDelete(id)
      if (!deletedWinery) {
        throw new Error(`No winery found to delete with ID '${id}'`)
      }

      logger.info(`Winery deleted successfully with ID: ${id}`)
      return deletedWinery
    } catch (error) {
      logger.error("Error deleting winery:", error)
      throw error
    }
  },

  /**
   * Get all winery users
   */
  getAllWineries: async () => {
    try {
      logger.info("Fetching all winery users")
      return await WineryModel.find()
    } catch (error) {
      logger.error("Error retrieving wineries:", error)
      throw new Error("Error retrieving wineries: " + error.message)
    }
  },

  /**
   * Get a winery by ID
   */
  getWineryById: async (id) => {
    try {
      logger.info(`Fetching winery with ID: ${id}`)

      const winery = await WineryModel.findById(id)
      if (!winery) {
        throw new Error(`Winery user with ID '${id}' could not be found!`)
      }

      return winery
    } catch (error) {
      logger.error("Error fetching winery by ID:", error)
      throw error
    }
  },

  /**
   * Update winery data completely
   */
  updateWinery: async ({ id, ...wineryArgs }) => {
    try {
      logger.info(`Updating winery with ID: ${id}`)

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
        throw new Error(`Database returned null when trying to update Winery user with ID '${id}'`)
      }

      logger.info(`Winery updated successfully with ID: ${id}`)
      return updatedWinery
    } catch (error) {
      logger.error("Error updating winery:", error)
      throw error
    }
  },

  /**
   * Update a single field of a winery
   */
  updateWineryField: async ({ id, field_name, field_value }) => {
    try {
      logger.info(`Updating single field '${field_name}' of winery ID: ${id}`)

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

      logger.debug(`Updating ID: ${id}, Field: ${field_name}, New Value: ${field_value}`)

      const updatedWinery = await WineryModel.findByIdAndUpdate(
        id,
        { [field_name]: field_value },
        { new: true }
      )

      if (!updatedWinery) {
        throw new Error(`Database returned null when trying to update '${field_name}' for Winery ID '${id}'`)
      }

      logger.info(`Winery field '${field_name}' updated successfully for ID: ${id}`)
      return updatedWinery
    } catch (error) {
      logger.error("Error updating single field of winery:", error)
      throw error
    }
  }
}

/*************************************************** Module Export ******************************************************/
module.exports = { wineriesService }
