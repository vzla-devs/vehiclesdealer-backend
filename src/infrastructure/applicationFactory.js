const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

function createWebApplication () {
  const app = express()
  addStaticRouteToApp(app, 'uploads')
  addStaticRouteToApp(app, 'assets')
  addCrossOriginResourceSharingToApp(app)
  addJSONParserToApp(app)
  addURLEncodedParserToApp(app)
  addRoutesToApp(app)
  return app
}

function addStaticRouteToApp (app, staticRoute) {
  app.use('api/static', express.static(`public/${staticRoute}`))
}

function addCrossOriginResourceSharingToApp (app) {
  app.use(cors())
}

function addJSONParserToApp(app) {
  app.use(bodyParser.json({ limit: '50mb' }))
}

function addURLEncodedParserToApp(app) {
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
}

function addRoutesToApp (app) {
  const vehicles = require('../routes/vehicles')
  const features = require('../routes/features')
  const services = require('../routes/services')
  const about = require('../routes/about')
  const contact = require('../routes/contact')
  const financing = require('../routes/financing')
  const pdf = require('../routes/pdf')

  app.use('/api/vehiculos', vehicles)
  app.use('/api/caracteristicas', features)
  app.use('/api/servicios', services)
  app.use('/api/texto', about)
  app.use('/api/contacto', contact)
  app.use('/api/financiacion', financing)
  app.use('/api/pdf', pdf)
}

export { createWebApplication }
