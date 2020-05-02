import mongoose from 'mongoose'

function connectToDatabase () {
  const connectionString = 'mongodb://localhost:32768/vehiclesdealer'
  createDatabaseConnection(connectionString)
  return getDatabaseConnection()
}

function createDatabaseConnection (connectionString) {
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
}

function getDatabaseConnection () {
  return mongoose.connection
}

export { connectToDatabase }
