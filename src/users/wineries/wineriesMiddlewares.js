/************************************************** Internal logger ***************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal libraries *************************************************/
const { statusCodes } = require("../../constants/statusCodes.js")
const { wineriesService } = require("./wineriesService.js")
const { WinerySchema } = require("./WineryModel.js")

const checkAllWineryArgsAreProvided = (req, res, next) => {
  res.locals.providedWineryArgs = {}
  let missingArgs = []
  const isUpdateRequest = req.method === "PUT"
  for (const arg in WinerySchema.obj) {
    if (isUpdateRequest && (arg === "email" || arg === "password")) continue
    if (req.body[arg]) res.locals.providedWineryArgs[arg] = req.body[arg]
    else if (WinerySchema.obj[arg].required) missingArgs.push(arg)
  }
  if (missingArgs.length === 0) next()
  else {
    const errorText = `Missing required arguments: ${missingArgs.join(", ")}!`
    logger.error(errorText)
    res.status(statusCodes.BadRequest)
      .send({ error: errorText })
  }
}

/* Check that it exists a winery user in the database with the ID provided in the request params */
const checkProvidedWineryExists = async (req, res, next) => {
  const { id } = req.params
  const allWineries = await wineriesService.getAllWineries()
  res.locals.matchingWinery = allWineries.find(winery => winery._id.toString() === id)
  if (res.locals.matchingWinery) next()
  else {
    const errorText = `Winery user with ID '${id}' could not be found!`
    logger.error(errorText)
    res.status(statusCodes.NotFound)
      .send({ error: errorText })
  }
}

const checkProvidedWineryFieldIsValid = (req, res, next) => {
  const { field } = req.params;
  try {
    if (!req.body.new_value) {
      throw new Error(`Missing '${field}' field value!`);
    }
    next();
  } catch (error) {
    logger.error(error.message);
    res.status(statusCodes.BadRequest).send({ error: error.message });
  }
}

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
      return res.status(statusCodes.InternalServerError).send({ error: errorText })
    }
  }

/*************************************************** Module export ****************************************************/
module.exports = {
  checkAllWineryArgsAreProvided,
  checkProvidedWineryExists,
  checkProvidedWineryFieldIsValid,
  checkUpdateFieldsProvided,
  checkNewValueMatchesConfirmation,
  checkCurrentValueIsCorrect
}
