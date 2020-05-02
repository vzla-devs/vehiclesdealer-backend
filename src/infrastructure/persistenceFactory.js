import mongoose from 'mongoose'

function getDatabaseConnection () {
  const connectionString = 'mongodb://localhost:32768/vehiclesdealer'
  connectToDatabase(connectionString)
  return getConnection()
}

function connectToDatabase (connectionString) {
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
}

function getConnection () {
  return mongoose.connection
}

export { getDatabaseConnection }
