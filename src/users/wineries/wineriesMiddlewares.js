const { statusCodes } = require("../../constants/statusCodes.js")

const { WinerySchema } = require("./WineryModel.js")
const { wineriesService } = require("./wineriesService.js")

const checkAllWineryArgsAreProvided = (req, res, next) => {
  res.locals.providedWineryArgs = {}
  let missingArgs = []
  for (const arg in WinerySchema.obj) {
    if (!req.body[arg]) missingArgs.push(arg)
    else res.locals.providedWineryArgs[arg] = req.body[arg]
  }
  if (missingArgs.length === 0) next()
  else return res.status(statusCodes.BadRequest)
    .send({ type: "error", msg: `Missing required arguments: ${missingArgs.join(", ")}` })
}

const checkProvidedWineryExists = async (req, res, next) => {
  const { id } = req.params
  const allWineries = await wineriesService.getAllWineries()
  res.locals.matchingWinery = allWineries.find(winery => winery._id.toString() === id)
  if (res.locals.matchingWinery) next()
  else res.status(statusCodes.NotFound)
    .send({ type: "error", msg: `Winery user with ID '${id}' could not be found!` })
}

const checkProvidedWineryFieldIsValid = (req, res, next) => {
  const { field } = req.params
  if (WinerySchema.obj[field]) {
    if (req.body[field]) next()
    else return res.status(statusCodes.BadRequest)
      .send({ type: "error", msg: `Missing '${field}' field value!` })
  }
  else return res.status(statusCodes.BadRequest)
    .send({ type: "error", msg: `'${field}' is not valid field for a winery user!` })
}

module.exports = {
  checkAllWineryArgsAreProvided,
  checkProvidedWineryExists,
  checkProvidedWineryFieldIsValid
}
