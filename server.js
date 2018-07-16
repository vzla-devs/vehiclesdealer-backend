// express
const express = require('express')
const app = express()
const port = 3000

// mongoose
var mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/laherradura'
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise;
const db = mongoose.connection

// rutas
const cars = require('./routes/cars')
app.use('/coches', cars)

// conexión con mongoDB
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {

})

app.listen(port, () => console.log(`Servidor express escuchando en el puerto ${port}`))