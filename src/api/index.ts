import { connectToDatabase } from '@/infrastructure/persistenceFactory'
import { createWebApplication } from '@/infrastructure/applicationFactory'

let server
const databaseConnection = connectToDatabase()
runAppOnceTheDatabaseIsConnected()
logDatabaseErrors()

function runAppOnceTheDatabaseIsConnected (): void {
  return databaseConnection.once('open', () => {
    const app = createWebApplication()
    const port = 8000
    server = app.listen(port, () => console.log('Running...'))
  }) 
}

function logDatabaseErrors () {
  databaseConnection.on('error', console.error.bind(console, 'Hubo un error de conexión con la base de datos: '))
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
