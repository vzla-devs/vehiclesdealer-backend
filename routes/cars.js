const express = require('express')
const router = express.Router()
const Car = require('../models/car')
//middleware para manejar formularios multipart
const multer = require('multer')
const upload = multer({ dest: 'uploads' })

// obtener coches
router.get('/', (req, res) => {
    
    Car.find({}, {
        make: 1,
        model: 1, 
        year: 1, 
        fuel_type: 1, 
        horsepower: 1, 
        kilometers: 1, 
        transmission: 1, 
        price: 1
    }).exec((err, cars) => {

        if (err) return console.error(err)

        res.send(cars)
    })
    //req.query contiene la query que se arma con los filtros para la búsqueda de los coches
})

// obtener coche en específico
router.get('/:id', (req, res) => {
    
    Car.find({_id: req.params.id}).exec((err, car) => {
        if (err) return console.error(err)

        res.send(car)
    })
})

// crear coche
router.post('/', upload.array('pictures'), (req, res) => {

    const body = req.body

    console.log(req.files)

    res.send(req.files)
    
    /*let car = new Car({
        make: body.make,
        model: body.model,
        year: parseInt(body.year),
        kilometers: parseInt(body.kilometers),
        fuel_type: body.fuel_type,
        horsepower: parseInt(body.horsepower),
        transmission: body.transmission,
        price: parseInt(body.price)
    })

    car.save((err, newCar) => {
        
        if (err) return res.json(err)

        res.json(newCar)
    })*/
})

// actualizar coche
router.put('/:carId', (req, res) => {
    res.send('pediste editar un coche')
})

module.exports = router