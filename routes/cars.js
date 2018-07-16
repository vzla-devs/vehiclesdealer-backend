const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('pediste todos los coches')
    //req.query contiene la query que se arma con los filtros para la búsqueda de los coches
})

router.get('/:id', (req, res) => {
    res.send('pediste un coche específico')
})

module.exports = router