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
      res.status(statusCodes.Created)
        .send({ msg: "Winery user created successfully!", ID: newWinery._id })
    } catch (error) {
      logger.error("Winery user could not be created!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  },
  deleteWinery: async (req, res) => {
    try {
      const deletedWinery = await wineriesService.deleteWinery({ id: res.locals.matchingWinery.id })
      res.status(statusCodes.OK)
        .send({ msg: "Winery user deleted successfully!", ID: deletedWinery._id })
    } catch (error) {
      logger.error("Winery user could not be deleted!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  },
  getAllWineries: async (req, res) => {
    const allWineries = await wineriesService.getAllWineries()
    res.status(statusCodes.OK)
      .send(allWineries)
  },
  getWineryDetails: async (req, res) => {
    res.status(statusCodes.OK)
      .send(res.locals.matchingWinery)
  },
  updateWinery: async (req, res) => {
    try {
      const updatedWinery = await wineriesService.updateWinery({
        id: req.params.id,
        ...res.locals.providedWineryArgs
      })
      res.status(statusCodes.OK)
        .send({ msg: "Winery user updated successfully!", ID: updatedWinery._id })
    } catch (error) {
      logger.error("Winery user could not be updated!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  },
  updateWineryField: async (req, res) => {
    try {
      const updatedWinery = await wineriesService.updateWineryField({
        id: req.params.id,
        field_name: req.params.field,
        field_value: req.body[req.params.field]
      })
      res.status(statusCodes.OK)
        .send({ msg: "Winery user field updated successfully!", ID: updatedWinery._id })
    } catch (error) {
      logger.error("Winery user field could not be updated!\n", error)
      res.status(statusCodes.InternalServerError)
        .send({ type: "error", msg: error.message })
    }
  }
}

module.exports = { wineriesController }
