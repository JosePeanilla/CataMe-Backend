/************************************************** Internal Logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries *************************************************/
const { statusCodes } = require("../constants/statusCodes.js")

/*********************************************** Region Data Validation Middleware *************************************/
/**
 * Validates that required fields for region creation or update are present.
 * Required fields: 'country' and 'name'.
 * If any required field is missing, responds with 400 Bad Request.
 */
const validateRegionData = (req, res, next) => {
  const { country, name } = req.body

  if (!country || !name) {
    const errorText = "Missing required region fields: 'country' and/or 'name'"
    logger.error(errorText)
    return res.status(statusCodes.BadRequest).json({ error: errorText })
  }

  next()
}

/*************************************************** Module Export ****************************************************/
module.exports = { validateRegionData }
