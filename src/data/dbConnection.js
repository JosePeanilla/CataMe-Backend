/************************************************** Internal logger ***************************************************/
const { Logger } = require("../utils/Logger.js")
const logger = new Logger(__filename)

/************************************************ Node modules needed *************************************************/
/* Manage MongoDB database accesses */
const mongoose = require("mongoose")

const dbConnection = async () => {
  const dbCluster = process.env.DB_CLUSTER
  const dbName = process.env.DB_NAME
  const dbUsername = process.env.DB_USERNAME
  const dbPassword = process.env.DB_PASSWORD
  const dbConnectionURI = `mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`
  
  try {
    const dbConnection = await mongoose.connect(dbConnectionURI)
    logger.info(
      "Connected to the MongoDB database!",
      " - host:", dbConnection.connection.host,
      "\n  - readyState:", dbConnection.connection.readyState)
  } catch (error) {
    logger.error("It could not be connected to the database!", error)
    /* Ensure that the client is closed when there's an error */
    await mongoose.disconnect()
    process.exit(1)
  }
}

/*************************************************** Module export ****************************************************/
module.exports = { dbConnection }
