const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
const Car = require('../models/car')
//middleware para manejar formularios multipart
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        let filename = Date.now()
        switch (file.mimetype) {
            case 'image/png':
            filename = filename + ".png"
            break;
            case 'image/jpeg':
            filename = filename + ".jpeg"
            break;
        }
        cb(null, filename);
    }
  })
   
const upload = multer({ storage: storage })

// obtener coches
router.get('/', (req, res) => {

    let filters = {}

    // si filtra por marca
    if (req.query.make != undefined) {
        filters.make = req.query.make
    }

    // si filtra por tipo de combustible
    if (req.query.fuel_type != undefined) {
        filters.fuel_type = req.query.fuel_type
    }

    // si filtra por tipo de transmisión
    if (req.query.transmission != undefined) {
        filters.transmission = req.query.transmission
    }

    // si filtra por precio
    if (req.query.price != undefined) {
        // si es un rango
        if (Array.isArray(req.query.price)) {
            filters.minPrice = req.query.price[0]
            filters.maxPrice = req.query.price[1]
        } else {
            // si es solamente un valor
            filters.minPrice = filters.maxPrice = req.query.price
        }
    }

    // si filtra por año
    if (req.query.year != undefined) {
        // si es un rango
        if (Array.isArray(req.query.year)) {
            filters.minYear = req.query.year[0]
            filters.maxYear = req.query.year[1]
        } else {
            // si es solamente un valor
            filters.minYear = filters.maxYear = req.query.year
        }
    }

    // si filtra por kilometraje
    if (req.query.kilometers != undefined) {
        // si es un rango
        if (Array.isArray(req.query.kilometers)) {
            filters.minKilometers = req.query.kilometers[0]
            filters.maxKilometers = req.query.kilometers[1]
        } else {
            // si es solamente un valor
            filters.minKilometers = filters.maxKilometers = req.query.kilometers
        }
    }

    //req.query contiene la query que se arma con los filtros para la búsqueda de los coches
    console.log(filters)
    
    Car.find({}, {
        make: 1,
        model: 1, 
        year: 1, 
        fuel_type: 1, 
        horsepower: 1, 
        kilometers: 1, 
        transmission: 1, 
        price: 1,
        pictures: 1
    }).exec((err, cars) => {

        if (err) return res.status(500).send(err)

        res.status(200).send(cars)
    })
})

router.get('/filtros', (req, res) => {
    Car.find({}, {
        _id: 0,
        make: 1,
        fuel_type: 1
    }).exec((err, cars) => {

        if (err) return res.status(500).send(err)

        let makes = cars.map((car) => car.make)

        let fuel_types = cars.map((car) => car.fuel_type)

        // ordena las marcas disponibles
        makes = makes.sort((a, b) => {
            if (a > b) return 1;
        })

        // ordena los tipos de combustible disponibles
        fuel_types = fuel_types.sort((a, b) => {
            if (a > b) return 1;
        })

        // quita las marcas repetidas
        makes = [ ...new Set(makes) ]

        // quita los tipos de combustible repetidos
        fuel_types = [ ...new Set(fuel_types) ]

        res.status(200).send({
            makes,
            fuel_types
        })
    })
})

// obtener coche en específico
router.get('/:id', (req, res) => {
    
    Car.find({_id: req.params.id})
    .exec((err, car) => {
        if (err) return res.status(500).send(err)

        res.status(200).send(car)
    })
})

// crear coche
router.post('/', upload.array('pictures'), async (req, res) => {

    const fields = req.body
    const pictures = req.files.map((pic) => `static/${pic.filename}`)
    
    // crea el coche
    let car = new Car({
        make: fields.make,
        model: fields.model,
        year: parseInt(fields.year),
        kilometers: parseInt(fields.kilometers),
        fuel_type: fields.fuel_type,
        horsepower: parseInt(fields.horsepower),
        transmission: fields.transmission,
        price: parseInt(fields.price),
        pictures: pictures
    })

    let newCar

    // guarda el coche en la db
    try {
        newCar = await car.save()
    } catch (err) {
        res.status(500).send(err)
    }

    res.status(201).send(newCar)
})

// actualizar coche
router.put('/:id', (req, res) => {
    res.status(200).send('pediste editar un coche')
})

router.delete('/:id', (req, res) => {

    // mejorar la implementacion del borrado
    Car.deleteOne({ _id: req.params.id }, (err, response) => {
        if(err) return res.status(500).send(err)

        res.status(200).send(response)
    })
})

module.exports = router