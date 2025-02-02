/************************************************** Internal logger ***************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Internal libraries *************************************************/
const { ConsumerSchema } = require("./ConsumerModel.js")
const { consumersService } = require("./consumersService.js")
const { statusCodes } = require("../../constants/statusCodes.js")

const checkAllConsumerArgsAreProvided = (req, res, next) => {
  res.locals.providedConsumerArgs = {}
  let missingArgs = []
  const isUpdateRequest = req.method === "PUT"
  for (const arg in ConsumerSchema.obj) {
    if (isUpdateRequest && (arg === "email" || arg === "password")) continue
    if (req.body[arg]) res.locals.providedConsumerArgs[arg] = req.body[arg]
    else if (ConsumerSchema.obj[arg].required) missingArgs.push(arg)
  }
  if (missingArgs.length === 0) next()
  else {
    const errorText = `Missing required arguments: ${missingArgs.join(", ")}!`
    logger.error(errorText)
    res.status(statusCodes.BadRequest)
      .send({ error: errorText })
  }
}

/* Check that it exists a consumer user in the database with the ID provided in the request params */
const checkProvidedConsumerExists = async (req, res, next) => {
  const { id } = req.params
  const allConsumers = await consumersService.getAllConsumers()
  res.locals.matchingConsumer = allConsumers.find(consumer => consumer._id.toString() === id)
  if (res.locals.matchingConsumer) next()
  else {
    const errorText = `Consumer user with ID '${id}' could not be found!`
    logger.error(errorText)
    res.status(statusCodes.NotFound)
      .send({ error: errorText })
  }
}

const checkProvidedConsumerFieldIsValid = (req, res, next) => {
  const { field } = req.params
  if (ConsumerSchema.obj[field]) {
    if (req.body[field]) next()
    else {
      const errorText = `Missing '${field}' field value!`
      logger.error(errorText)
      res.status(statusCodes.BadRequest)
        .send({ error: errorText })
    }
  }
  else {
    const errorText = `'${field}' is not valid field for a consumer user!`
    logger.error(errorText)
    res.status(statusCodes.BadRequest)
      .send({ error: errorText })
  }
}

/*************************************************** Module export ****************************************************/
module.exports = {
  checkAllConsumerArgsAreProvided,
  checkProvidedConsumerExists,
  checkProvidedConsumerFieldIsValid
}
