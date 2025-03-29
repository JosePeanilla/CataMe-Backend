/************************************************** Internal Logger *****************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal Libraries ***************************************************/
const { statusCodes } = require("../../constants/statusCodes.js")
const { wineriesService } = require("./wineriesService.js")
const { WinerySchema } = require("./WineryModel.js")

/************************************ Middleware: Check all required fields are provided ********************************/
/**
 * Validates that the required winery fields are included in the request body.
 * Skips checking `email` and `password` for PUT requests (updates).
 */
const checkAllWineryArgsAreProvided = (req, res, next) => {
  res.locals.providedWineryArgs = {}
  const missingArgs = []
  const isUpdateRequest = req.method === "PUT"

  for (const arg in WinerySchema.obj) {
    if (isUpdateRequest && (arg === "email" || arg === "password")) continue
    if (req.body[arg]) res.locals.providedWineryArgs[arg] = req.body[arg]
    else if (WinerySchema.obj[arg].required) missingArgs.push(arg)
  }

  if (missingArgs.length === 0) return next()

  const errorText = `Missing required arguments: ${missingArgs.join(", ")}!`
  logger.error(errorText)
  res.status(statusCodes.BadRequest).send({ error: errorText })
}

/******************************** Middleware: Check if winery exists by ID **********************************************/
/**
 * Looks for a winery by ID. If it exists, stores it in `res.locals.matchingWinery`.
 * If not, returns 404 Not Found.
 */
const checkProvidedWineryExists = async (req, res, next) => {
  const { id } = req.params
  const allWineries = await wineriesService.getAllWineries()
  res.locals.matchingWinery = allWineries.find(winery => winery._id.toString() === id)

  if (res.locals.matchingWinery) return next()

  const errorText = `Winery user with ID '${id}' could not be found!`
  logger.error(errorText)
  res.status(statusCodes.NotFound).send({ error: errorText })
}

/********************************** Middleware: Check single field is being updated *************************************/
/**
 * Validates that a `new_value` is provided for the field update.
 */
const checkProvidedWineryFieldIsValid = (req, res, next) => {
  const { field } = req.params
  try {
    if (!req.body.new_value) {
      throw new Error(`Missing '${field}' field value!`)
    }
    next()
  } catch (error) {
    logger.error(error.message)
    res.status(statusCodes.BadRequest).send({ error: error.message })
  }
}

/************************ Middleware: Check field update values are present in request **********************************/
/**
 * Ensures `current_value`, `new_value`, and `confirm_new_value` are present in the request.
 */
const checkUpdateFieldsProvided = (req, res, next) => {
  const { field } = req.params
  const { current_value, new_value, confirm_new_value } = req.body

  if (!current_value || !new_value || !confirm_new_value) {
    const errorText = `Missing required fields: 'current_value', 'new_value', 'confirm_new_value' for ${field}!`
    logger.error(errorText)
    return res.status(statusCodes.BadRequest).send({ error: errorText })
  }

  next()
}

/****************************** Middleware: Check new value matches confirmation ***************************************/
/**
 * Verifies that `new_value` and `confirm_new_value` match.
 */
const checkNewValueMatchesConfirmation = (req, res, next) => {
  const { field } = req.params
  const { new_value, confirm_new_value } = req.body

  if (new_value !== confirm_new_value) {
    const errorText = `New ${field} and confirmation ${field} must match!`
    logger.error(errorText)
    return res.status(statusCodes.BadRequest).send({ error: errorText })
  }

  next()
}

/****************************** Middleware: Check current value matches stored value ************************************/
/**
 * Compares `current_value` from the request with the value in the DB.
 * Stores `new_value` in `res.locals` if valid.
 */
const checkCurrentValueIsCorrect = async (req, res, next) => {
  const { id, field } = req.params
  const { current_value, new_value } = req.body

  try {
    const winery = await wineriesService.getWineryById(id)

    if (!winery) {
      const errorText = `Winery with ID '${id}' not found!`
      logger.error(errorText)
      return res.status(statusCodes.NotFound).send({ error: errorText })
    }

    if (winery[field] !== current_value) {
      const errorText = `Current ${field} does not match registered ${field}!`
      logger.error(errorText)
      return res.status(statusCodes.Forbidden).send({ error: errorText })
    }

    res.locals.new_value = new_value
    logger.debug(`New value for ${field}: ${new_value} successfully stored in res.locals.`)
    next()
  } catch (error) {
    const errorText = `Error checking winery ${field}!`
    logger.error(errorText, error)
    res.status(statusCodes.InternalServerError).send({ error: errorText })
  }
}

/*************************************************** Module Export ******************************************************/
module.exports = {
  checkAllWineryArgsAreProvided,
  checkProvidedWineryExists,
  checkProvidedWineryFieldIsValid,
  checkUpdateFieldsProvided,
  checkNewValueMatchesConfirmation,
  checkCurrentValueIsCorrect
}
