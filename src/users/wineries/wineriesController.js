/* Internal logger */
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)
const { statusCodes } = require("../../constants/statusCodes.js")

const { wineriesService } = require("./wineriesService.js")

/* Controller of the 'winery users' requests and responses handling */
const wineriesController = {
  createWinery: async (req, res) => {
    try {
      const newWinery = await wineriesService.createWinery(res.locals.providedWineryArgs)
      const successText = "Winery user created successfully!"
      logger.debug(successText)
      res.status(statusCodes.Created)
        .send({ msg: successText, data: newWinery._id })
    } catch (error) {
      const errorText = "Winery user could not be created!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  deleteWinery: async (req, res) => {
    try {
      const deletedWinery = await wineriesService.deleteWinery({ id: res.locals.matchingWinery.id })
      const successText = "Winery user deleted successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: deletedWinery._id })
    } catch (error) {
      const errorText = "Winery user could not be deleted!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  getAllWineries: async (req, res) => {
    try {
      const allWineries = await wineriesService.getAllWineries()
      const successText = "ALL winery users retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: allWineries })
    } catch (error) {
      const errorText = "ALL winery users could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  getWineryDetails: async (req, res) => {
    try {
      const successText = "Information regarding winery user retrieved successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: res.locals.matchingWinery })
    } catch (error) {
      const errorText = "Information regarding winery user could not be retrieved!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  updateWinery: async (req, res) => {
    try {
      const updatedWinery = await wineriesService.updateWinery({
        id: req.params.id,
        ...res.locals.providedWineryArgs
      })
      const successText = "Winery user updated successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: updatedWinery._id })
    } catch (error) {
      const errorText = "Winery user could not be updated!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  },
  updateWineryField: async (req, res) => {
    try {
      const updatedWinery = await wineriesService.updateWineryField({
        id: req.params.id,
        field_name: req.params.field,
        field_value: req.body[req.params.field]
      })
      const successText = "Winery user field updated successfully!"
      logger.debug(successText)
      res.status(statusCodes.OK)
        .send({ msg: successText, data: updatedWinery._id })
    } catch (error) {
      const errorText = "Winery user field could not be updated!"
      logger.error(errorText, error)
      res.status(statusCodes.InternalServerError)
        .send({ msg: errorText, error: error.message })
    }
  }
}

module.exports = { wineriesController }
