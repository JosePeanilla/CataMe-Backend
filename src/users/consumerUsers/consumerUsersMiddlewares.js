const { statusCodes } = require("../../constants/statusCodes.js")

const { consumerUserSchema } = require("./ConsumerUserModel.js")
const { consumerUsersService } = require("./consumerUsersService.js")

const checkAllConsumerUserArgsAreProvided = (req, res, next) => {
  res.locals.providedConsumerUserArgs = {}
  let missingArgs = []
  for (const arg in consumerUserSchema.obj) {
    if (!req.body[arg]) missingArgs.push(arg)
    else res.locals.providedConsumerUserArgs[arg] = req.body[arg]
  }
  if (missingArgs.length === 0) next()
  else return res.status(statusCodes.BadRequest)
    .send({ type: "error", msg: `Missing required arguments: ${missingArgs.join(", ")}` })
}

const checkProvidedConsumerUserExists = async (req, res, next) => {
  const { id } = req.params
  const allConsumerUsers = await consumerUsersService.getAllConsumerUsers()
  res.locals.matchingConsumerUser = allConsumerUsers.find(user => user._id.toString() === id)
  if (res.locals.matchingConsumerUser) next()
  else res.status(statusCodes.NotFound)
    .send({ type: "error", msg: `User with ID '${id}' could not be found!` })
}

const checkProvidedConsumerUserFieldIsValid = (req, res, next) => {
  const { field } = req.params
  if (consumerUserSchema.obj[field]) {
    if (req.body[field]) next()
    else return res.status(statusCodes.BadRequest)
      .send({ type: "error", msg: `Missing '${field}' field value!` })
  }
  else return res.status(statusCodes.BadRequest)
    .send({ type: "error", msg: `'${field}' is not valid field for a consumer user!` })
}

module.exports = {
  checkAllConsumerUserArgsAreProvided,
  checkProvidedConsumerUserExists,
  checkProvidedConsumerUserFieldIsValid
}
