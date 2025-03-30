/************************************************** Internal Logger *****************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries ***************************************************/
const { statusCodes } = require("../../constants/statusCodes.js")
const { wineriesService } = require("./wineriesService.js")
const { sendVerificationEmail } = require("../../emailService/sendVerificationEmail.js")

/************************************* Wineries Controller: Route Handlers **********************************************/
/**
 * Handles request/response logic for all operations related to winery users.
 */

const wineriesController = {
  /**
   * POST /users/wineries
   * Create a new winery user and send verification email
   */
  createWinery: async (req, res) => {
    try {
      const newWinery = await wineriesService.createWinery(res.locals.providedWineryArgs)
      const successText = "Winery user created successfully!"
      logger.debug(successText)

      // Send verification email
      sendVerificationEmail(newWinery.email, newWinery.name, newWinery._id)
        .then(() => logger.debug("Verification email sent successfully"))
        .catch(err => logger.error("Failed to send verification email", err))

      res.status(statusCodes.Created).send({ msg: successText, data: newWinery._id })
    } catch (error) {
      const errorText = "Winery user could not be created!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).send({ msg: errorText, error: error.message })
    }
  },

  /**
   * DELETE /users/wineries/:id
   * Delete a winery user by ID
   */
  deleteWinery: async (req, res) => {
    try {
      const deletedWinery = await wineriesService.deleteWinery({ id: res.locals.matchingWinery.id })
      const successText = "Winery user deleted successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).send({ msg: successText, data: deletedWinery._id })
    } catch (error) {
      const errorText = "Winery user could not be deleted!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).send({ msg: errorText, error: error.message })
    }
  },

  /**
   * GET /users/wineries
   * Get all winery users
   */
  getAllWineries: async (req, res) => {
    try {
      const allWineries = await wineriesService.getAllWineries()
      const successText = "ALL winery users retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).send({ msg: successText, data: allWineries })
    } catch (error) {
      const errorText = "ALL winery users could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).send({ msg: errorText, error: error.message })
    }
  },

  /**
   * GET /users/wineries/:id
   * Get a specific winery user from res.locals
   */
  getWinery: async (req, res) => {
    try {
      const successText = "Information regarding winery user retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).send({ msg: successText, data: res.locals.matchingWinery })
    } catch (error) {
      const errorText = "Information regarding winery user could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).send({ msg: errorText, error: error.message })
    }
  },

  /**
   * PUT /users/wineries/:id
   * Update full winery user data
   */
  updateWinery: async (req, res) => {
    try {
      const currentWinery = await wineriesService.getWineryById(req.params.id)

      if (!currentWinery) {
        const errorText = `Winery user with ID '${req.params.id}' could not be found!`
        logger.warn(errorText)
        throw new Error(errorText)
      }

      const isSameData = Object.keys(res.locals.providedWineryArgs).every(
        key => currentWinery[key] === res.locals.providedWineryArgs[key]
      )

      if (isSameData) {
        const errorText = "No se ha realizado ningún cambio en la información."
        logger.warn(errorText)
        return res.status(statusCodes.BadRequest).send({ msg: errorText, error: errorText })
      }

      const updatedWinery = await wineriesService.updateWinery({
        id: req.params.id,
        ...res.locals.providedWineryArgs
      })

      const successText = "Winery user updated successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK).send({ msg: successText, data: updatedWinery })
    } catch (error) {
      const errorText = "Winery user could not be updated!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError).send({ msg: errorText, error: error.message })
    }
  },

  /**
   * PATCH /users/wineries/:id/:field
   * Update a specific field for a winery user
   */
  updateWineryField: async (req, res) => {
    try {
      const { id, field } = req.params
      const newValue = res.locals.new_value

      logger.debug(`Updating winery field: ${field} with value: ${newValue}`)

      if (!newValue) {
        throw new Error(`New value for field '${field}' is undefined!`)
      }

      const currentWinery = await wineriesService.getWineryById(id)

      if (!currentWinery) {
        throw new Error(`Winery user with ID '${id}' could not be found!`)
      }

      if (currentWinery[field] === newValue) {
        return res.status(statusCodes.BadRequest).send({
          msg: `The value for '${field}' is already set to '${newValue}', no changes made.`,
          error: `No changes were made as the value is identical.`,
        })
      }

      const updatedWinery = await wineriesService.updateWineryField({
        id,
        field_name: field,
        field_value: newValue,
      })

      if (!updatedWinery) {
        throw new Error(`Update failed: No result returned from database.`)
      }

      const successText = "Winery user field updated successfully!"
      logger.debug(successText)
      return res.status(statusCodes.OK).send({ msg: successText, data: updatedWinery })
    } catch (error) {
      const errorText = "Winery user field could not be updated!"
      logger.error(errorText, error)
      return res.status(statusCodes.InternalServerError).send({ msg: errorText, error: error.message })
    }
  }
}

/*************************************************** Module Export ******************************************************/
module.exports = { wineriesController }
