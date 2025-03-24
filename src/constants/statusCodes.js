const statusCodes = {
  /* Successful responses */
  OK: 200,
  Created: 201,

  /* Redirections */
  MovedPermanently: 301,
  Found: 302,

  /* Client error responses */
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  Conflict: 409,
  UnprocessableEntity: 422,
  TooManyRequests: 429,

  /* Server error responses */
  InternalServerError: 500,
  ServiceUnavailable: 503,
  GatewayTimeout: 504
}

/*************************************************** Module export ****************************************************/
module.exports = { statusCodes }
