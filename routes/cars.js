const express = require('express')
const router = express.Router()
const Car = require('../models/car')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        let filename = Date.now()
        switch (file.mimetype) {
            case 'image/png':
            filename = filename + '.png'
            break;
            case 'image/jpeg':
            filename = filename + '.jpeg'
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
    if (req.query.make !== undefined) {
        filters.make = req.query.make
    }

    // si filtra por tipo de combustible
    if (req.query.fuel_type !== undefined) {
        filters.fuel_type = req.query.fuel_type
    }

    // si filtra por tipo de transmisión
    if (req.query.transmission !== undefined) {
        filters.transmission = req.query.transmission
    }

    // si filtra por añor
    if (req.query.minYear !== undefined || req.query.maxYear !== undefined) {
        
        let yearRange = {}

        if (req.query.minYear !== undefined) yearRange.$gte = parseInt(req.query.minYear, 10)

        if (req.query.maxYear !== undefined) yearRange.$lte = parseInt(req.query.maxYear, 10)

        filters.year = yearRange
    }

    // si filtra por precio
    if (req.query.minPrice !== undefined || req.query.maxPrice !== undefined) {
        
        let priceRange = {}

        if (req.query.minPrice !== undefined) priceRange.$gte = parseInt(req.query.minPrice, 10)

        if (req.query.maxPrice !== undefined) priceRange.$lte = parseInt(req.query.maxPrice, 10)

        filters.price = priceRange
    }

    // si filtra por kilometraje
    if (req.query.minKilometers !== undefined || req.query.maxKilometers !== undefined) {
        
        let kilometersRange = {}

        if (req.query.minKilometers !== undefined) kilometersRange.$gte = parseInt(req.query.minKilometers, 10)

        if (req.query.maxKilometers !== undefined) kilometersRange.$lte = parseInt(req.query.maxKilometers, 10)

        filters.kilometers = kilometersRange
    }

    //req.query contiene la query que se arma con los filtros para la búsqueda de los coches
    console.log(filters)
    
    Car.find(filters, {
        make: 1,
        model: 1,
        color: 1,
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

// obtener filtros de los coches
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
    .populate('features')
    .populate('services')
    .exec((err, car) => {
        if (err) return res.status(500).send(err)

        // si el coche no existe en la base de datos
        if (car == null) return res.status(404).send('El coche no existe')
        
        // si el coche sí existe en la base de datos
        res.status(200).send(car)
    })
})

// crear coche
router.post('/', async (req, res) => {
    const fields = req.body
    console.log('campos que llegan', req.body)
    // crea el coche
    let car = new Car({
        make: fields.make,
        year: parseInt(fields.year),
        fuel_type: fields.fuelType,
        transmission: fields.transmission,
        model: fields.model,
        color: fields.color,
        kilometers: parseInt(fields.kilometers),
        horsepower: parseInt(fields.horsepower),
        price: parseInt(fields.price),
        pictures: [],
        description: fields.description,
        features: fields.features,
        services: fields.services
    })

    // guarda el coche en la db
    try {
        let newCar = await car.save()
        res.status(201).send(newCar)
    // si ocurre un error al intentar guardar el coche en la base de datos
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

// actualizar datos del coche
router.put('/:id/data', (req, res) => {

    let fields = req.body
    console.log(req.body.picturesToDelete)

    Car.findOne({_id: req.params.id})
    .exec(async (err, car) => {
        if (err) return res.status(500).send(err)

        // si el coche no existe en la base de datos
        if (car === null) return res.status(404).send('El coche no existe')

        // si se va a modificar la marca del coche
        if (fields.make !== undefined) car.make = fields.make

        // si se va a modificar el año del coche
        if (fields.year !== undefined) car.year = fields.year

        // si se va a modificar el tipo de combustible del coche
        if (fields.fuelType !== undefined) car.fuel_type = fields.fuelType

        // si se va a modificar la transmisión del coche
        if (fields.transmission !== undefined) car.transmission = fields.transmission

        // si se va a modificar el color del coche
        if (fields.color !== undefined) car.color = fields.color

        // si se va a modificar el modelo del coche
        if (fields.model !== undefined) car.model = fields.model

        // si se va a modificar el kilometraje del coche
        if (fields.kilometers !== undefined) car.kilometers = fields.kilometers

        // si se va a modificar la potencia del coche
        if (fields.horsepower !== undefined) car.horsepower = fields.horsepower

        // si se va a modificar el precio del coche
        if (fields.price !== undefined) car.price = parseInt(fields.price, 10)

        // si se van a modificar las características del coche
        if (fields.features !== undefined) car.features = fields.features

        // se se van a modificar los servicios del coche
        if (fields.services !== undefined) car.services = fields.services

        // si se va a modificar la descripción del coche
        if (fields.description !== undefined) car.description = fields.description

        // si se van a eliminar fotos del coche
        if (fields.picturesToDelete !== undefined) {
            // eliminando fotos previas del coche
            fields.picturesToDelete.forEach(removedPic => {
                let index = car.pictures.findIndex(pic => pic === removedPic)
                // elimina la foto del array de fotos del coche
                car.pictures.splice(index, 1)
                // elimina la foto del sistema de archivos del servidor
                fs.unlink(`uploads/${removedPic}`, err => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log('archivo eliminado')
                    }
                })
            })
        }

        // guarda el coche en la db
        try {
            let updatedCar = await car.save()
            res.status(200).send(updatedCar)
        } catch (err) {
            res.status(500).send(err)
        }
    })
})

// actualizar fotos del coche
router.put('/:id/pictures', upload.array('pictures'), (req, res) => {
    console.log('imágenes nuevas', req.files)

    Car.findOne({_id: req.params.id})
    .exec(async (err, car) => {
        if (err) return res.status(500).send(err)

        // si el coche no existe en la base de datos
        if (car === null) return res.status(404).send('El coche no existe')

        // si se van a subir fotos nuevas
        if (req.files.length > 0) {
            let newPictures = req.files.map(pic => `${pic.filename}`)
            car.pictures = [...car.pictures, ...newPictures]
        }

        // guarda el coche en la db
        try {
            let updatedCar = await car.save()
            res.status(200).send(updatedCar)
        } catch (err) {
            res.status(500).send(err)
        }
    })
})

// eliminar coche
router.delete('/:id', (req, res) => {
    // mejorar la implementacion del borrado
    Car.findOne({_id: req.params.id})
    .exec((err, car) => {
        if (err) return res.status(500).send(err)

        // si el coche no existe en la base de datos
        if (car === null) return res.status(404).send('El coche no existe')

        car.pictures.forEach(pic => {
            fs.unlink(`uploads/${pic}`, (err) => {
                if (err) console.log(err)

                console.log(`imagen ${pic} eliminada del servidor`)
            })
        })

        Car.deleteOne({ _id: req.params.id }, (err, response) => {
            if(err) return res.status(500).send(err)
    
            res.status(200).send(response)
        })
    })
})

module.exports = router