import '@babel/polyfill'
import { getWebApplication } from './infrastructure/applicationFactory'
const app = getWebApplication()
const port = 8000

var mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:32768/vehiclesdealer'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise
const db = mongoose.connection

const vehicles = require('./routes/vehicles')
const features = require('./routes/features')
const services = require('./routes/services')
const about = require('./routes/about')
const contact = require('./routes/contact')
const financing = require('./routes/financing')
const pdf = require('./routes/pdf')

app.use('/api/vehiculos', vehicles)
app.use('/api/caracteristicas', features)
app.use('/api/servicios', services)
app.use('/api/texto', about)
app.use('/api/contacto', contact)
app.use('/api/financiacion', financing)
app.use('/api/pdf', pdf)

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`))
db.on('error', console.error.bind(console, 'Hubo un error de conexión con la base de datos: '))
