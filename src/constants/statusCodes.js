/************************************************** HTTP Status Code Constants ****************************************/
/**
 * Centralized list of commonly used HTTP status codes for consistent API responses.
 * Improves readability and maintainability across controllers and services.
 */

const statusCodes = {
  /******************************************** 2XX - Successful Responses ********************************************/
  OK: 200,                         // Request succeeded
  Created: 201,                    // Resource successfully created

  /*********************************************** 3XX - Redirections ************************************************/
  MovedPermanently: 301,           // Resource has been moved permanently
  Found: 302,                      // Resource has been found at a different URI

  /******************************************** 4XX - Client Error Responses *****************************************/
  BadRequest: 400,                 // Request is malformed or invalid
  Unauthorized: 401,              // Authentication required or failed
  Forbidden: 403,                 // Authenticated, but not authorized
  NotFound: 404,                  // Requested resource not found
  MethodNotAllowed: 405,          // HTTP method not supported on this route
  Conflict: 409,                  // Conflict with current state of resource
  UnprocessableEntity: 422,       // Validation failed or semantic error
  TooManyRequests: 429,           // Rate limit exceeded

  /******************************************** 5XX - Server Error Responses ******************************************/
  InternalServerError: 500,       // General server-side error
  ServiceUnavailable: 503,        // Server is temporarily unavailable
  GatewayTimeout: 504             // Timeout waiting for upstream server
}

/*************************************************** Module Export ****************************************************/
module.exports = { statusCodes }
