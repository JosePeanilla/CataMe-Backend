/*********************************************** Node Modules Needed ****************************************************/
/* Used to create an ExpressJS router */
const express = require("express")

/************************************************** Logger Setup ********************************************************/
const { Logger } = require("../../utils/Logger.js")
const logger = new Logger(__filename)

/********************************************** ExpressJS Router Object *************************************************/
const consumersRouter = express.Router()

/**************************************************** Middlewares *******************************************************/
/* Custom middlewares for consumer validation and authorization */
const {
  checkAllConsumerArgsAreProvided,
  checkProvidedConsumerExists,
  checkProvidedConsumerFieldIsValid,
  checkUpdateFieldsProvided,
  checkNewValueMatchesConfirmation,
  checkCurrentValueIsCorrect
} = require("./consumersMiddlewares.js")

const {
  checkProvidedTokenIsValid,
  checkUserIsAuthorized
} = require("../../auth/authMiddlewares.js")

/****************************************************** Controller ******************************************************/
const { consumersController } = require("./consumersController.js")

/*********************************************** Public & Protected Endpoints *******************************************/

/**
 * GET /users/consumers
 * Retrieve all consumers (token required)
 */
consumersRouter.get('/',
  checkProvidedTokenIsValid,
  (req, res, next) => {
    logger.info("GET /users/consumers - Fetching all consumers")
    consumersController.getAllConsumers(req, res, next)
  }
)

/**
 * POST /users/consumers
 * Register a new consumer (public)
 */
consumersRouter.post('/',
  checkAllConsumerArgsAreProvided,
  (req, res, next) => {
    logger.info("POST /users/consumers - Creating new consumer")
    consumersController.createConsumer(req, res, next)
  }
)

/****************************************** Routes that depend on consumer ID *******************************************/

/* Protect all routes with :id param */
consumersRouter.use("/:id", checkProvidedTokenIsValid, checkProvidedConsumerExists)

/**
 * GET /users/consumers/:id
 * Get consumer by ID
 */
consumersRouter.get('/:id', (req, res, next) => {
  logger.info(`GET /users/consumers/${req.params.id} - Fetching consumer`)
  consumersController.getConsumer(req, res, next)
})

/**
 * PUT /users/consumers/:id
 * Full update of consumer info
 */
consumersRouter.put('/:id',
  checkUserIsAuthorized,
  checkAllConsumerArgsAreProvided,
  (req, res, next) => {
    logger.info(`PUT /users/consumers/${req.params.id} - Updating consumer`)
    consumersController.updateConsumer(req, res, next)
  }
)

/**
 * DELETE /users/consumers/:id
 * Delete consumer account
 */
consumersRouter.delete('/:id', (req, res, next) => {
  logger.info(`DELETE /users/consumers/${req.params.id} - Deleting consumer`)
  consumersController.deleteConsumer(req, res, next)
})

/**************************************** PATCH: Update Single Field of Consumer ****************************************/

/**
 * PATCH /users/consumers/:id/:field
 * Update a specific field of a consumer
 */
consumersRouter.patch('/:id/:field',
  checkProvidedTokenIsValid,
  checkUserIsAuthorized,
  checkProvidedConsumerFieldIsValid,
  checkUpdateFieldsProvided,
  checkNewValueMatchesConfirmation,
  checkCurrentValueIsCorrect,
  (req, res, next) => {
    logger.info(`PATCH /users/consumers/${req.params.id}/${req.params.field} - Updating field`)
    consumersController.updateConsumerField(req, res, next)
  }
)

/*************************************************** Module Export ******************************************************/
module.exports = { consumersRouter }
