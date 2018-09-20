// express
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000
const cors = require('cors')
app.use('/api/static', express.static('uploads'))

app.use(cors()) // para manejar solicitudes Cross-origin
app.use(bodyParser.json({limit: '50mb'})) // para parsear json
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })) // para parsear application/x-www-form-urlencoded

// mongoose
var mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/moncars'
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection

// rutas
const vehicles = require('./routes/vehicles')
const features = require('./routes/features')
const services = require('./routes/services')
const contact = require('./routes/contact')
const pdf = require('./routes/pdf')

app.use('/api/vehiculos', vehicles)
app.use('/api/caracteristicas', features)
app.use('/api/servicios', services)
app.use('/api/contacto', contact)
app.use('/api/pdf', pdf)

// conexión con mongoDB
db.on('error', console.error.bind(console, 'Error de conexión:'))
db.once('open', () => {

})

app.listen(port, () => console.log(`Servidor express escuchando en el puerto ${port}`))