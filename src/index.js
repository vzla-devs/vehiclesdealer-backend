import '@babel/polyfill'
import { connectToDatabase } from './infrastructure/persistenceFactory'
import { createWebApplication } from './infrastructure/applicationFactory'

const databaseConnection = connectToDatabase()
databaseConnection.on('error', console.error.bind(console, 'Hubo un error de conexión con la base de datos: '))
databaseConnection.once('open', () => {
  const app = createWebApplication()
  const port = 8000
  app.listen(port, () => console.log(`Escuchando en el puerto ${port}`))
})
