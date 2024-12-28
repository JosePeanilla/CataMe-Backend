const moment = require('moment')

class Logger {
  constructor(filePath) {
    this.fileName = filePath.split("\\").pop()
  }

  #getFormattedDateTime() {
    return moment().format('YYYY/MM/DD HH:mm:ss')
  }

  #getFormattedMessage({ message, level }) {
    const formattedDateTime = this.#getFormattedDateTime()
    const formattedFileName = this.fileName
    const formattedLevel = level.toUpperCase()
    return `[${formattedDateTime}][${formattedFileName}][${formattedLevel}] ${message}`
  }

  #log({ message, level = "info" }) {
    const formattedMessage = this.#getFormattedMessage({ message, level })
    switch (level) {
      case "debug":
        console.debug(formattedMessage)
        break
      case "info":
        console.info(formattedMessage)
        break
      case "warning":
        console.warn(formattedMessage)
        break
      case "error":
        console.error(formattedMessage)
        break
      default:
        console.error(formattedMessage)
        break
    }
  }

  debug(message) {
    this.#log({ message, level: "debug" })
  }

  info(message) {
    this.#log({ message, level: "info" })
  }

  warning(message) {
    this.#log({ message, level: "warning" })
  }

  error(message) {
    this.#log({ message, level: "error" })
  }
}

module.exports = { Logger }
