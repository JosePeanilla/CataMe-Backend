/* Codes extracted from: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status */
const statusCodes = {
  /* Successful responses */
  OK: 200,
  Created: 201,
  /* Client error responses */
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  /* Server error responses */
  InternalServerError: 500
}

/*************************************************** Module export ****************************************************/
module.exports = { statusCodes }
