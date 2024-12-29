const mongoose = require("mongoose")

/* Internal logger */
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

const dbConnection = async () => {
  const dbCluster = process.env.DB_CLUSTER
  const dbName = process.env.DB_NAME
  const dbUsername = process.env.DB_USERNAME
  const dbPassword = process.env.DB_PASSWORD
  const dbConnectionURI = `mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster.toLowerCase()}.qdd0s.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbCluster}`

  try {
    const dbConnection = await mongoose.connect(dbConnectionURI)
    logger.debug(
      "Connected to the MongoDB database!",
      "\n  - readyState:", dbConnection.connection.readyState,
      "\n  - host:", dbConnection.connection.host)
  } catch (error) {
    logger.error("It could not be connected to the database!\n", error)
    await mongoose.disconnect()  /* Ensure that the client is closed when there's an error */
    process.exit(1)
  }
}

module.exports = { dbConnection }
