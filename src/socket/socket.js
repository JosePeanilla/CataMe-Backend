/************************************************** Internal Logger *****************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node Modules Needed **************************************************/
/* Manage real-time communication with socket.io */
const { Server } = require("socket.io")

/*************************************************** Internal State *****************************************************/
/**
 * Holds the Socket.io instance to be reused across the application.
 */
let io

/*********************************************** Socket.io Initialization Function **************************************/
/**
 * Initializes the Socket.io server using the provided HTTP server instance.
 * Sets up CORS and listens for connection, room joining, and disconnection events.
 */
const initializeSocket = (server) => {
  logger.info("Initializing Socket.io...")

  io = new Server(server, {
    cors: { origin: "*" } // Allow all origins (adjust as needed for security)
  })

  io.on("connection", (socket) => {
    logger.debug(`New client connected: ${socket.id}`)

    /**
     * Listen for a client joining a specific winery room.
     * This enables sending real-time updates to only that winery's connected clients.
     */
    socket.on("join-winery-room", (wineryId) => {
      if (!wineryId) {
        logger.warn(`Socket ${socket.id} attempted to join an undefined winery room.`)
        return
      }
      logger.debug(`Socket ${socket.id} joined winery room: ${wineryId}`)
      socket.join(wineryId)
    })

    // Handle client disconnection
    socket.on("disconnect", () => {
      logger.debug(`Client disconnected: ${socket.id}`)
    })
  })
}

/*********************************************** Retrieve Socket.io Instance ********************************************/
/**
 * Returns the current Socket.io instance.
 * Throws an error if Socket.io has not yet been initialized.
 */
const getIO = () => {
  if (!io) {
    const errorText = "Socket.io has not been initialized yet!"
    logger.error(errorText)
    throw new Error(errorText)
  }
  return io
}

/*************************************************** Module Export ******************************************************/
module.exports = { initializeSocket, getIO }
