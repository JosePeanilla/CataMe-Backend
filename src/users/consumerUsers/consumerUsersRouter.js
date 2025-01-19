const express = require("express")  /* Node module used to create an ExpressJS router */
const consumerUsersRouter = express.Router()  /* ExpressJS router object */

/* Middlewares */
const {
  checkAllConsumerUserArgsAreProvided,
  checkProvidedConsumerUserExists,
  checkProvidedConsumerUserFieldIsValid
} = require("./consumerUsersMiddlewares.js")

/* Endpoints */
const { consumerUsersController } = require("./consumerUsersController.js")

/* /users/consumers/ */
consumerUsersRouter.get('/', consumerUsersController.getAllConsumerUsers)
consumerUsersRouter.post('/',
  checkAllConsumerUserArgsAreProvided,
  consumerUsersController.createConsumerUser
)

/* /users/consumers/<id>/ */
consumerUsersRouter.use("/:id", checkProvidedConsumerUserExists)  /* Check that it exists a consumer user in the database with the ID provided in the request params */
consumerUsersRouter.get('/:id', consumerUsersController.getConsumerUserDetails)
consumerUsersRouter.put('/:id',
  checkAllConsumerUserArgsAreProvided,
  consumerUsersController.updateConsumerUser
)
consumerUsersRouter.delete('/:id', consumerUsersController.deleteConsumerUser)

/* /users/<id>/<field>/ */
consumerUsersRouter.patch('/:id/:field',
  checkProvidedConsumerUserFieldIsValid,
  consumerUsersController.updateConsumerUserField
)

module.exports = { consumerUsersRouter }
