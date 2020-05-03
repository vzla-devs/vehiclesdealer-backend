import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import vehicles from '../routes/vehicles'
import features from '../routes/features'
import services from '../routes/services'
import about from '../routes/about'
import contact from '../routes/contact'
import financing from '../routes/financing'
import pdf from '../routes/pdf'

const app = express()

function createWebApplication () {
  addStaticRouteToApp('uploads')
  addStaticRouteToApp('assets')
  addCrossOriginResourceSharingToApp()
  addJSONParserToApp()
  addURLEncodedParserToApp()
  addRoutesToApp()
  return app
}

function addStaticRouteToApp (staticRoute) {
  app.use('api/static', express.static(`public/${staticRoute}`))
}

function addCrossOriginResourceSharingToApp () {
  app.use(cors())
}

function addJSONParserToApp() {
  app.use(bodyParser.json({ limit: '50mb' }))
}

function addURLEncodedParserToApp() {
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
}

function addRoutesToApp () {
  app.use('/api/vehiculos', vehicles)
  app.use('/api/caracteristicas', features)
  app.use('/api/servicios', services)
  app.use('/api/texto', about)
  app.use('/api/contacto', contact)
  app.use('/api/financiacion', financing)
  app.use('/api/pdf', pdf)
}

export { createWebApplication }
