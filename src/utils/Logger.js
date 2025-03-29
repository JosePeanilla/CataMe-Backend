/*********************************************** Node Modules Needed ****************************************************/
/* Handle date and time formatting */
const moment = require('moment')

/**************************************************** Logger Class ******************************************************/
/**
 * Custom logger class to output standardized log messages with timestamp, file name,
 * and log level. Supports debug, info, warn, and error levels.
 */
class Logger {
  constructor(filePath) {
    // Extract only the file name from the full file path
    this.fileName = filePath.split("\\").pop()
  }

  // Private method: Get current datetime in formatted string
  #getFormattedDateTime() {
    return moment().format('YYYY/MM/DD HH:mm:ss')
  }

  // Private method: Format the beginning of the log message
  #getFormattedLogStart(level) {
    const formattedDateTime = this.#getFormattedDateTime()
    const maxFileNameLength = 0 // Not used now but can be helpful for padding consistency
    const formattedFileName = this.fileName.padStart(maxFileNameLength, ' ')
    const maxLevelLength = 0
    const formattedLevel = level.toUpperCase().padEnd(maxLevelLength, ' ')
    return `[${formattedDateTime}][${formattedFileName}][${formattedLevel}]`
  }

  // Private method: Centralized log formatter and dispatcher
  #log(level = "info", message, ...additionalParams) {
    const formattedLogStart = this.#getFormattedLogStart(level)
    const formattedMessage = additionalParams.length ? `${message}\n` : message

    switch (level) {
      case "debug":
        console.debug(formattedLogStart, formattedMessage, ...additionalParams)
        break
      case "info":
        console.info(formattedLogStart, formattedMessage, ...additionalParams)
        break
      case "warn":
        console.warn(formattedLogStart, formattedMessage, ...additionalParams)
        break
      case "error":
        console.error(formattedLogStart, formattedMessage, ...additionalParams)
        break
      default:
        console.error(formattedLogStart, formattedMessage, ...additionalParams)
        break
    }
  }

  // Public methods for each log level
  debug(message, ...additionalParams) {
    this.#log("debug", message, ...additionalParams)
  }

  info(message, ...additionalParams) {
    this.#log("info", message, ...additionalParams)
  }

  warn(message, ...additionalParams) {
    this.#log("warn", message, ...additionalParams)
  }

  error(message, ...additionalParams) {
    this.#log("error", message, ...additionalParams)
  }
}

/*************************************************** Module Export ******************************************************/
module.exports = { Logger }
