import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import vehicles from '@/api/routes/vehicles'
import features from '@/api/routes/features'
import services from '@/api/routes/services'
import about from '@/api/routes/about'
import contact from '@/api/routes/contact'
import financing from '@/api/routes/financing'
import pdf from '@/api/routes/pdf'
import users from '@/api/routes/users'

function createWebApplication(): express.Application {
  const app = express()
  addStaticRouteToApp(app, 'uploads')
  addStaticRouteToApp(app, 'assets')
  addCrossOriginResourceSharingToApp(app)
  addJSONParserToApp(app)
  addURLEncodedParserToApp(app)
  addRoutesToApp(app)
  addNotFoundRoutesHandlerToApp(app)
  addErrorsHandlerToApp(app)
  return app
}

function addStaticRouteToApp(app: express.Application, staticRoute: string): void {
  app.use('/api/static', express.static(`public/${staticRoute}`))
}

function addCrossOriginResourceSharingToApp(app: express.Application): void {
  app.use(cors())
}

function addJSONParserToApp(app: express.Application): void {
  app.use(bodyParser.json({ limit: '50mb' }))
}

function addURLEncodedParserToApp(app: express.Application): void {
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
}

function addRoutesToApp(app: express.Application): void {
  app.use('/api/vehiculos', vehicles)
  app.use('/api/caracteristicas', features)
  app.use('/api/servicios', services)
  app.use('/api/texto', about)
  app.use('/api/contacto', contact)
  app.use('/api/financiacion', financing)
  app.use('/api/pdf', pdf)
  app.use('/api/usuarios', users)
}

function addNotFoundRoutesHandlerToApp(app: express.Application): void {
  app.use((req, res, next) => {
    res.status(404).send('Uh-oh...not found :(')
  })
}

function addErrorsHandlerToApp(app: express.Application): void {
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.stack)
  })
}

export { createWebApplication }
