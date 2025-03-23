/************************************************** Internal logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node modules needed *************************************************/
/* Manage real-time communication with socket.io */
const { Server } = require("socket.io")

/*************************************************** Internal state ****************************************************/
let io

/************************************************** Socket.io Initialization *******************************************/
const initializeSocket = (server) => {
    logger.info("Initializing Socket.io...")
  
    io = new Server(server, {
      cors: { origin: "*" } // Se puede ajustar según las necesidades
    })
  
    io.on("connection", (socket) => {
      logger.debug(`Nuevo cliente conectado: ${socket.id}`)
  
      // Escuchar cuando un usuario se una a la 'room' de la bodega
      socket.on("join-winery-room", (wineryId) => {
        if (!wineryId) {
          logger.warn(`Socket ${socket.id} intentó unirse a una room de bodega indefinida.`)
          return
        }
        logger.debug(`Socket ${socket.id} se une a la sala de la bodega: ${wineryId}`)
        socket.join(wineryId)
      })
  
      socket.on("disconnect", () => {
        logger.debug(`Cliente desconectado: ${socket.id}`)
      })
    })
  }

/************************************************** Retrieve Socket.io Instance ****************************************/
const getIO = () => {
    if (!io) {
      const errorText = "Socket.io no se ha inicializado todavía!"
      logger.error(errorText)
      throw new Error(errorText)
    }
    return io
  }

/*************************************************** Module export ****************************************************/
module.exports = { initializeSocket, getIO }
