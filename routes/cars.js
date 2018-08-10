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
    if (req.query.minPrice != undefined || req.query.maxPrice != undefined) {
        
        let priceRange = {}

        if (req.query.minPrice != undefined) priceRange.$lte = parseInt(req.query.maxPrice, 10)

        if (req.query.maxPrice != undefined) priceRange.$gte = parseInt(req.query.minPrice, 10)

        filters.price = priceRange
    }

    // si filtra por kilometraje
    if (req.query.minKilometers != undefined || req.query.maxKilometers != undefined) {
        
        let kilometersRange = {}

        if (req.query.minKilometers != undefined) kilometersRange.$lte = parseInt(req.query.maxKilometers, 10)

        if (req.query.maxKilometers != undefined) kilometersRange.$gte = parseInt(req.query.minKilometers, 10)

        filters.kilometers = kilometersRange
    }

    //req.query contiene la query que se arma con los filtros para la búsqueda de los coches
    console.log(filters)
    
    Car.find(filters, {
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

        cars = cars.sort((a, b) => {
            if (a.make > b.make) return 1;
        })

        res.status(200).send(cars)
    })
})

router.get('/filtros', (req, res) => {
    Car.find({}, {
        _id: 0,
        make: 1,
        fuel_type: 1,
        year: 1,
        price: 1,
        kilometers: 1
    }).exec((err, cars) => {

        if (err) return res.status(500).send(err)

        let makes = cars.map((car) => car.make)

        let fuel_types = cars.map((car) => car.fuel_type)

        let years = cars.map((car) => car.year)

        let prices = cars.map((car) => car.price)

        let kilometers = cars.map((car) => car.kilometers)

        // ordena las marcas disponibles
        makes = makes.sort((a, b) => {
            if (a > b) return 1;
        })

        // ordena los tipos de combustible disponibles
        fuel_types = fuel_types.sort((a, b) => {
            if (a > b) return 1;
        })

        // ordena los años de los coches disponibles
        years = years.sort((a, b) => {
            if (a > b) return 1;
        })

        // ordena los precios de los coches disponibles
        prices = prices.sort((a, b) => {
            if (a > b) return 1;
        })

        // ordena los kilómetros disponibles
        kilometers = kilometers.sort((a, b) => {
            if (a > b) return 1;
        })

        // quita las marcas repetidas
        makes = [ ...new Set(makes) ]

        // quita los tipos de combustible repetidos
        fuel_types = [ ...new Set(fuel_types) ]

        // quita los años repetidos
        years = [ ...new Set(years) ]

        // quita los precios repetidos
        prices = [ ...new Set(prices) ]

        // quita los kilómetros repetidos
        kilometers = [ ...new Set(kilometers) ]

        res.status(200).send({
            makes,
            fuel_types,
            years,
            prices,
            kilometers
        })
    })
})

// obtener coche en específico
router.get('/:id', (req, res) => {
    Car.findOne({_id: req.params.id})
    .exec((err, car) => {
        if (err) return res.status(500).send(err)

        // si el coche no existe en la base de datos
        if (car == null) return res.status(404).send('El coche no existe')
        
        // si el coche sí existe en la base de datos
        res.status(200).send(car)
    })
})

// crear coche
router.post('/', upload.array('pictures'), async (req, res) => {
    const fields = req.body
    const pictures = req.files.map((pic) => `${pic.filename}`)
    
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

    // guarda el coche en la db
    try {
        let newCar = await car.save()
        res.status(201).send(newCar)
    
    // si ocurre un error al intentar guardar el coche en la base de datos
    } catch (err) {
        res.status(500).send(err)
    }
})

// actualizar coche
router.put('/:id', upload.array('pictures'), (req, res) => {

    let fields = req.body

    Car.findOne({_id: req.params.id})
    .exec(async (err, car) => {
        if (err) return res.status(500).send(err)

        // si el coche no existe en la base de datos
        if (car == null) return res.status(404).send('El coche no existe')
        
        // si se van a actualizar las fotos
        if (req.files.length > 0) {
            let pictures = req.files.map(pic => `${pic.filename}`)

            // eliminando fotos previas del coche
            car.pictures.forEach(pic => {
                fs.unlink(`uploads/${pic}`, err => {
                    if (err) console.error(err)

                    console.log('archivo eliminado')
                })
            })
            car.pictures = pictures
        }

        // si se va a actualizar el precio
        if (fields.price != undefined) car.price = parseInt(fields.price, 10)

        // guarda el coche en la db
        try {
            let updatedCar = await car.save()
            res.status(200).send(updatedCar)
        } catch (err) {
            res.status(500).send(err)
        }
    })
})

router.delete('/:id', (req, res) => {

    // mejorar la implementacion del borrado
    Car.deleteOne({ _id: req.params.id }, (err, response) => {
        if(err) return res.status(500).send(err)

        res.status(200).send(response)
    })
})

module.exports = router