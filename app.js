const express = require('express')
const app = express()
const port = 3000

const mongoClient = require('mongodb').MongoClient
const assert = require('assert')

app.get('/', (req, res) => {

    mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {

        assert.equal(null, err);
        console.log('Conectado con éxito al servidor')

        const db = client.db('laherradura')

        db.collection('coches').find({}).toArray((err, coches) => {
            coches.forEach((coche) => console.log(coche.marca))
        })
    })

    res.send('Hola mundo!')
})

app.listen(port, () => console.log(`App corriendo en el puerto ${port}`))