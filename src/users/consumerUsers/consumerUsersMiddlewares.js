const { statusCodes } = require("../../constants/statusCodes.js")

const checkRequiredArgsAreProvided = (req, res, next) => {
  res.locals.providedConsumerUserArgs = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true
  }
  // Check that all required arguments are provided
  let missingArgs = []
  for (const arg in res.locals.providedConsumerUserArgs) {
    if (!res.locals.providedConsumerUserArgs[arg]) {
      missingArgs.push(arg)
    }
  }
  if (missingArgs.length === 0) next()
  else {
    return res.status(statusCodes.BadRequest)
      .send({ msg: `Missing required arguments: ${missingArgs.join(", ")}` })
  }
}

module.exports = {
  checkRequiredArgsAreProvided
}
