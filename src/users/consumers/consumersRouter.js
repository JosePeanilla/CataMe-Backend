const express = require("express")  /* Node module used to create an ExpressJS router */
const consumersRouter = express.Router()  /* ExpressJS router object */

/* Middlewares */
const {
  checkAllConsumerArgsAreProvided,
  checkProvidedConsumerExists,
  checkProvidedConsumerFieldIsValid
} = require("./consumersMiddlewares.js")

/* Endpoints */
const { consumersController } = require("./consumersController.js")

/* /users/consumers/ */
consumersRouter.get('/', consumersController.getAllConsumers)
consumersRouter.post('/',
  checkAllConsumerArgsAreProvided,
  consumersController.createConsumer
)

/* /users/consumers/<id>/ */
consumersRouter.use("/:id", checkProvidedConsumerExists)  /* Check that it exists a consumer user in the database with the ID provided in the request params */
consumersRouter.get('/:id', consumersController.getConsumerDetails)
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

module.exports = { consumersRouter }
