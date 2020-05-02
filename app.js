const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000
const cors = require('cors')
app.use('/api/static', express.static('public/uploads'))
app.use('/api/static', express.static('public/assets'))
app.use(cors()) // para manejar solicitudes Cross-origin
app.use(bodyParser.json({ limit: '50mb' })) // para parsear json
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })) // para parsear application/x-www-form-urlencoded

var mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:32768/vehiclesdealer'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise
const db = mongoose.connection

const vehicles = require('./src/routes/vehicles')
const features = require('./src/routes/features')
const services = require('./src/routes/services')
const about = require('./src/routes/about')
const contact = require('./src/routes/contact')
const financing = require('./src/routes/financing')
const pdf = require('./src/routes/pdf')

app.use('/api/vehiculos', vehicles)
app.use('/api/caracteristicas', features)
app.use('/api/servicios', services)
app.use('/api/texto', about)
app.use('/api/contacto', contact)
app.use('/api/financiacion', financing)
app.use('/api/pdf', pdf)

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`))
db.on('error', console.error.bind(console, 'Hubo un error de conexión con la base de datos: '))
