const { statusCodes } = require("../../constants/statusCodes.js")

const { ConsumerSchema } = require("./ConsumerModel.js")
const { consumersService } = require("./consumersService.js")

const checkAllConsumerArgsAreProvided = (req, res, next) => {
  res.locals.providedConsumerArgs = {}
  let missingArgs = []
  for (const arg in ConsumerSchema.obj) {
    if (req.body[arg]) res.locals.providedConsumerArgs[arg] = req.body[arg]
    else if (ConsumerSchema.obj[arg].required) missingArgs.push(arg)
  }
  if (missingArgs.length === 0) next()
  else return res.status(statusCodes.BadRequest)
    .send({ type: "error", msg: `Missing required arguments: ${missingArgs.join(", ")}` })
}

const checkProvidedConsumerExists = async (req, res, next) => {
  const { id } = req.params
  const allConsumers = await consumersService.getAllConsumers()
  res.locals.matchingConsumer = allConsumers.find(consumer => consumer._id.toString() === id)
  if (res.locals.matchingConsumer) next()
  else res.status(statusCodes.NotFound)
    .send({ type: "error", msg: `Consumer user with ID '${id}' could not be found!` })
}

const checkProvidedConsumerFieldIsValid = (req, res, next) => {
  const { field } = req.params
  if (ConsumerSchema.obj[field]) {
    if (req.body[field]) next()
    else return res.status(statusCodes.BadRequest)
      .send({ type: "error", msg: `Missing '${field}' field value!` })
  }
  else return res.status(statusCodes.BadRequest)
    .send({ type: "error", msg: `'${field}' is not valid field for a consumer user!` })
}

module.exports = {
  checkAllConsumerArgsAreProvided,
  checkProvidedConsumerExists,
  checkProvidedConsumerFieldIsValid
}
