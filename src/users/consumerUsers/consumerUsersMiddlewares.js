const { statusCodes } = require("../../constants/statusCodes.js")

const checkRequiredArgsAreProvided = (req, res, next) => {
  res.locals.providedConsumerUserArgs = {
    name: req.body.name,
    surname: req.body.surname
  }
  // Check that all required arguments are provided
  for (const arg in res.locals.providedConsumerUserArgs) {
    if (!res.locals.providedConsumerUserArgs[arg]) {
      res.status(statusCodes.BadRequest)
        .send({ msg: `Missing required parameter: '${arg}'` })
      return
    }
  }
  next()
}

module.exports = {
  checkRequiredArgsAreProvided
}
