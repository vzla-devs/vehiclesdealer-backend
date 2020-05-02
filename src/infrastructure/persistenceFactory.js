import mongoose from 'mongoose'

function connectToDatabase () {
  createDatabaseConnection()
  return getDatabaseConnection()
}

function createDatabaseConnection () {
  const connectionString = 'mongodb://localhost:32768/vehiclesdealer'
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
}

function getDatabaseConnection () {
  return mongoose.connection
}

export { connectToDatabase }
