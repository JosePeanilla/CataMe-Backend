/************************************************** Internal Logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************* Node Modules Needed ************************************************/
/* MongoDB ODM */
const mongoose = require("mongoose")

/********************************************** Database Connection Function *******************************************/
/**
 * Connects to MongoDB Atlas using environment variables.
 * If the connection fails, logs the error and terminates the process.
 */
const dbConnection = async () => {
  const dbCluster = process.env.DB_CLUSTER
  const dbName = process.env.DB_NAME
  const dbUsername = process.env.DB_USERNAME
  const dbPassword = process.env.DB_PASSWORD
  const dbAppName = process.env.DB_APP_NAME || "DefaultAppName"

  // Construct MongoDB URI
  const dbConnectionURI = `mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=${dbAppName}`

  try {
    // Attempt to connect to MongoDB
    const dbConnection = await mongoose.connect(dbConnectionURI)

    logger.info(
      "Connected to the MongoDB database!",
      " - host:", dbConnection.connection.host,
      "\n  - readyState:", dbConnection.connection.readyState
    )
  } catch (error) {
    logger.error("It could not be connected to the database!", error)

    // Disconnect in case of partial connection attempt
    await mongoose.disconnect()

    // Exit the application with failure code
    process.exit(1)
  }
}

/*************************************************** Module Export ****************************************************/
module.exports = { dbConnection }
