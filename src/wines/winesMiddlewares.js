/*********************************************** Internal Modules ********************************************************/
const { statusCodes } = require("../constants/statusCodes.js")

/******************************************************* Logger **********************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/******************************************** Middleware: Validate Wine Data *********************************************/
/**
 * Ensures that all required fields for creating or updating a wine
 * are present in the request body. If any required field is missing,
 * it responds with 400 Bad Request.
 */
const validateWineData = (req, res, next) => {
  const {
    name,
    winery,
    type,
    region,
    year,
    price,
    description,
    additionalDescription,
    grapeType
  } = req.body

  if (
    !name ||
    !winery ||
    !type ||
    !region ||
    !year ||
    !price ||
    !description ||
    !grapeType
  ) {
    const errorText = "Missing required wine fields"
    logger.warn(`Validation failed: ${errorText}`)
    return res.status(statusCodes.BadRequest).json({ error: errorText })
  }

  logger.info("Wine data validated successfully")
  next()
}

/*************************************************** Module Export ******************************************************/
module.exports = { validateWineData }
