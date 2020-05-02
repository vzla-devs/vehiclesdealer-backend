import mongoose from 'mongoose'

function getDatabaseConnection () {
  const connectionString = 'mongodb://localhost:32768/vehiclesdealer'
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.Promise = global.Promise
  return mongoose.connection
}

export { getDatabaseConnection }
