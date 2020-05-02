const express = require('./node_modules/express')
const bodyParser = require('./node_modules/body-parser')
const cors = require('./node_modules/cors')

export const getWebApplication = () => {
  const app = express()
  addStaticRouteToApp(app, 'uploads')
  addStaticRouteToApp(app, 'assets')
  addCrossOriginResourceSharingToApp(app)
  addJSONParserToApp(app)
  addURLEncodedParserToApp(app)
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
