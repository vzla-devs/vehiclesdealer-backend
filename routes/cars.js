const express = require('express')
const router = express.Router()
const Car = require('../models/car')

// obtener coches
router.get('/', (req, res) => {
    
    Car.find({}).exec((err, cars) => {

        if (err) return console.error(err)

        res.send(cars)
    })
    //req.query contiene la query que se arma con los filtros para la búsqueda de los coches
})

// obtener coche en específico
router.get('/:carId', (req, res) => {
    res.send('pediste un coche específico')
})

// crear coche
router.post('/', (req, res) => {

    res.json(req.body)

    const body = req.body

    console.log(body.model)
    
    var car = new Car({
        make: body.make,
        model: body.model,
        year: parseInt(body.year),
        kilometers: parseInt(body.kilometers),
        fuel_type: body.fuel_type,
        horsepower: parseInt(body.horsepower),
        transmission: body.transmission,
        price: parseInt(body.price),
        description: body.description
    })

    car.save((err) => {
        console.log(err)
    })
})

// actualizar coche
router.put('/:carId', (req, res) => {
    res.send('pediste editar un coche')
})

module.exports = router