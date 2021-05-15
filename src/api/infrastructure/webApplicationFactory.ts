import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import cors from 'cors'
import vehicles from '@/api/controllers/vehiclesController'
import features from '@/api/controllers/featuresController'
import services from '@/api/controllers/servicesController'
import description from '@/api/controllers/descriptionController'
import contact from '@/api/controllers/contactController'
import pictures from '@/api/controllers/picturesController'
import users from '@/api/controllers/usersController'
import { DomainError } from '@/shared/domain/domainError'

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
  app.use(express.json({ limit: '50mb' }))
}

function addURLEncodedParserToApp(app: express.Application): void {
  app.use(express.urlencoded({ extended: true, limit: '50mb' }))
}

function addRoutesToApp(app: express.Application): void {
  app.use('/api/vehiculos', vehicles)
  app.use('/api/caracteristicas', features)
  app.use('/api/servicios', services)
  app.use('/api/texto', description)
  app.use('/api/contacto', contact)
  app.use('/api/imagenes', pictures)
  app.use('/api/usuarios', users)
}

function addNotFoundRoutesHandlerToApp(app: express.Application): void {
  app.use((req, res, next) => {
    res.status(404).send('Uh-oh...not found :(')
  })
}

function addErrorsHandlerToApp(app: express.Application): void {
  app.use((err, req, res, next) => {
    if (err instanceof DomainError) {
      res.status(400).json({
        error: err.constructor.name,
        reason: err.reason
      })
    } else {
      res.status(500).json(err)
    }
  })
}

export { createWebApplication }
