/************************************************ Node modules needed *************************************************/
/* Used to create an ExpressJS router */
const express = require("express")

/********************************************** ExpressJS router object ***********************************************/
const wineriesRouter = express.Router()

/**************************************************** Middlewares *****************************************************/
const {
  checkAllWineryArgsAreProvided,
  checkProvidedWineryExists,
  checkProvidedWineryFieldIsValid
} = require("./wineriesMiddlewares.js")

/***************************************************** Endpoints ******************************************************/
const { wineriesController } = require("./wineriesController.js")

/* /users/wineries/ */
wineriesRouter.get('/', wineriesController.getAllWineries)
wineriesRouter.post('/',
  checkAllWineryArgsAreProvided,
  wineriesController.createWinery
)

/* /users/wineries/<id>/ */
wineriesRouter.use("/:id", checkProvidedWineryExists)
wineriesRouter.get('/:id', wineriesController.getWinery)
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

/*************************************************** Module export ****************************************************/
module.exports = { wineriesRouter }
