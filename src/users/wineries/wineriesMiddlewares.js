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
  const { field } = req.params
  if (WinerySchema.obj[field]) {
    if (req.body[field]) next()
    else {
      const errorText = `Missing '${field}' field value!`
      logger.error(errorText)
      res.status(statusCodes.BadRequest)
        .send({ error: errorText })
    }
  }
  else {
    const errorText = `'${field}' is not valid field for a winery user!`
    logger.error(errorText)
    res.status(statusCodes.BadRequest)
      .send({ error: errorText })
  }
}

/*************************************************** Module export ****************************************************/
module.exports = {
  checkAllWineryArgsAreProvided,
  checkProvidedWineryExists,
  checkProvidedWineryFieldIsValid
}
