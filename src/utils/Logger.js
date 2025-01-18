const moment = require('moment')

class Logger {
  constructor(filePath) {
    this.fileName = filePath.split("\\").pop()
  }

  #getFormattedDateTime() {
    return moment().format('YYYY/MM/DD HH:mm:ss')
  }

  #getFormattedLogStart(level) {
    const formattedDateTime = this.#getFormattedDateTime()
    const formattedFileName = this.fileName
    const formattedLevel = level.toUpperCase()
    return `[${formattedDateTime}][${formattedFileName}][${formattedLevel}]`
  }

  #log(level = "info", message, ...additionalParams) {
    const formattedLogStart = this.#getFormattedLogStart(level)
    switch (level) {
      case "debug":
        console.debug(formattedLogStart, message, ...additionalParams)
        break
      case "info":
        console.info(formattedLogStart, message, ...additionalParams)
        break
      case "warn":
        console.warn(formattedLogStart, message, ...additionalParams)
        break
      case "error":
        console.error(formattedLogStart, message, ...additionalParams)
        break
      default:
        console.error(formattedLogStart, message, ...additionalParams)
        break
    }
  }

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

module.exports = { Logger }
