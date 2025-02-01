/************************************************ Node modules needed *************************************************/
/* Used to create an ExpressJS router */
const express = require("express")

/********************************************** ExpressJS router object ***********************************************/
const consumersRouter = express.Router()

/**************************************************** Middlewares *****************************************************/
const {
  checkAllConsumerArgsAreProvided,
  checkProvidedConsumerExists,
  checkProvidedConsumerFieldIsValid
} = require("./consumersMiddlewares.js")
const { checkProvidedTokenIsValid } = require("../../auth/authMiddlewares.js")

/***************************************************** Endpoints ******************************************************/
const { consumersController } = require("./consumersController.js")

/* /users/consumers/ */
consumersRouter.get('/',
  checkProvidedTokenIsValid,
  consumersController.getAllConsumers
)
consumersRouter.post('/',
  checkAllConsumerArgsAreProvided,
  consumersController.createConsumer
)

/* /users/consumers/<id>/ */
consumersRouter.use("/:id", checkProvidedConsumerExists)
consumersRouter.get('/:id', consumersController.getConsumer)
consumersRouter.put('/:id',
  checkAllConsumerArgsAreProvided,
  consumersController.updateConsumer
)
consumersRouter.delete('/:id', consumersController.deleteConsumer)

/* /users/consumers/<id>/<field>/ */
consumersRouter.patch('/:id/:field',
  checkProvidedConsumerFieldIsValid,
  consumersController.updateConsumerField
)

/*************************************************** Module export ****************************************************/
module.exports = { consumersRouter }
