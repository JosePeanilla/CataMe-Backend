const express = require("express")  /* Node module used to create an ExpressJS router */
const wineriesRouter = express.Router()  /* ExpressJS router object */

/* Middlewares */
const {
  checkAllWineryArgsAreProvided,
  checkProvidedWineryExists,
  checkProvidedWineryFieldIsValid
} = require("./wineriesMiddlewares.js")

/* Endpoints */
const { wineriesController } = require("./wineriesController.js")

/* /users/wineries/ */
wineriesRouter.get('/', wineriesController.getAllWineries)
wineriesRouter.post('/',
  checkAllWineryArgsAreProvided,
  wineriesController.createWinery
)

/* /users/wineries/<id>/ */
wineriesRouter.use("/:id", checkProvidedWineryExists)  /* Check that it exists a winery user in the database with the ID provided in the request params */
wineriesRouter.get('/:id', wineriesController.getWineryDetails)
wineriesRouter.put('/:id',
  checkAllWineryArgsAreProvided,
  wineriesController.updateWinery
)
wineriesRouter.delete('/:id', wineriesController.deleteWinery)

/* /users/wineries/<id>/<field>/ */
wineriesRouter.patch('/:id/:field',
  checkProvidedWineryFieldIsValid,
  wineriesController.updateWineryField
)

module.exports = { wineriesRouter }
