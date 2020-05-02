import mongoose from 'mongoose'

function getDatabaseConnection () {
  const connectionString = 'mongodb://localhost:32768/vehiclesdealer'
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  return mongoose.connection
}

export { getDatabaseConnection }
