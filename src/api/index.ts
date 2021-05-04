import { createDatabaseConnection, getDatabaseConnection } from '@/shared/infrastructure/persistenceFactory'
import { createWebApplication } from '@/api/infrastructure/webApplicationFactory'

const port = process.env.MONGO_PORT || 27017
const connectionString = `mongodb://localhost:${port}/vehiclesdealer`
createDatabaseConnection(connectionString)
const databaseConnection = getDatabaseConnection()
runAppOnceTheDatabaseIsConnected()
logDatabaseErrors()

let server

function runAppOnceTheDatabaseIsConnected (): void {
  databaseConnection.once('open', () => {
    const app = createWebApplication()
    const port = 8000
    server = app.listen(port, () => console.log('Running...'))
  }) 
}

function logDatabaseErrors () {
  databaseConnection.on('error', console.error.bind(console, 'There was an error when trying to connect to the database: '))
}

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received')
  cleanupAndExit()
})

process.on('SIGINT', () => {
  console.log('SIGINT signal received')
  cleanupAndExit()
})

function cleanupAndExit () {
  server.close(() => {
    console.log('server connection closed')
    databaseConnection.close()
    console.log('database connection closed')
    process.exit(0)
  })
}
