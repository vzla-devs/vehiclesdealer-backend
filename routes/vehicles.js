const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const sharp = require('sharp')
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

// obtener vehículos
router.get('/', (req, res) => {

    let filters = {}

    // si filtra por tipo de vehículo
    if (req.query.type !== undefined) {
        filters.type = req.query.type
    }

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

    // si filtra por año
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
    
    Vehicle.find(filters, {
        type: 1,
        make: 1,
        model: 1,
        color: 1,
        year: 1, 
        fuel_type: 1, 
        horsepower: 1, 
        kilometers: 1, 
        transmission: 1, 
        price: 1,
        pictures: 1,
        featured: 1
    }).exec((err, vehicles) => {

        if (err) return res.status(500).send(err)

        vehicles = vehicles.sort((a, b) => {
            if (a.make > b.make) return 1
            return 0
        })

        res.status(200).send(vehicles)
    })
})

// obtener filtros de los vehículos
router.get('/filtros', (req, res) => {
    Vehicle.find({}, {
        _id: 0,
        type: 1,
        make: 1,
        fuel_type: 1,
        year: 1,
        price: 1,
        kilometers: 1
    }).exec((err, vehicles) => {

        if (err) return res.status(500).send(err)

        let types = vehicles.map(vehicle => vehicle.type)

        let makes = vehicles.map(vehicle => vehicle.make)

        let fuel_types = vehicles.map(vehicle => vehicle.fuel_type)

        let years = vehicles.map(vehicle => vehicle.year)

        let prices = vehicles.map(vehicle => vehicle.price)

        let kilometers = vehicles.map(vehicle => vehicle.kilometers)

        // ordena los tipos de vehículos disponibles
        types = types.sort((a, b) => {
            if (a > b) return 1
            return 0
        })

        // ordena las marcas disponibles
        makes = makes.sort((a, b) => {
            if (a > b) return 1
            return 0
        })

        // ordena los tipos de combustible disponibles
        fuel_types = fuel_types.sort((a, b) => {
            if (a > b) return 1
            return 0
        })

        // ordena los años de los vehículos disponibles
        years = years.sort((a, b) => {
            if (a > b) return 1
            return 0
        })

        // ordena los precios de los vehículos disponibles
        prices = prices.sort((a, b) => {
            if (a > b) return 1
            return 0
        })

        // ordena los kilómetros disponibles
        kilometers = kilometers.sort((a, b) => {
            if (a > b) return 1
            return 0
        })

        // quita los tipos de vehículos repetidos
        types = [ ...new Set(types) ]

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
            types,
            makes,
            fuel_types,
            years,
            prices,
            kilometers
        })
    })
})

// obtener un vehículo en específico
router.get('/:id', (req, res) => {
    Vehicle.findOne({_id: req.params.id})
    .populate('features')
    .populate('services')
    .exec((err, vehicle) => {
        if (err) return res.status(500).send(err)

        // si el vehículo no existe en la base de datos
        if (vehicle == null) return res.status(404).send('El vehículo no existe')
        
        // si el vehículo sí existe en la base de datos
        res.status(200).send(vehicle)
    })
})

// crear vehículo
router.post('/', async (req, res) => {
    const fields = req.body
    // crea el vehículo
    let vehicle = new Vehicle({
        type: fields.type,
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
        services: fields.services,
        cylinders: fields.cylinders,
        featured: fields.featured
    })

    // guarda el vehículo en la db
    try {
        let newVehicle = await vehicle.save()
        res.status(201).send(newVehicle)
    // si ocurre un error al intentar guardar el vehículo en la base de datos
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

// actualizar datos del vehículo
router.put('/:id/datos', (req, res) => {

    let fields = req.body
    console.log(req.body.picturesToDelete)

    Vehicle.findOne({_id: req.params.id})
    .exec(async (err, vehicle) => {
        if (err) return res.status(500).send(err)

        // si el vehículo no existe en la base de datos
        if (vehicle === null) return res.status(404).send('El vehículo no existe')

        // si se va a modificar la marca del vehículo
        if (fields.make !== undefined) vehicle.make = fields.make

        // si se va a modificar el año del vehículo
        if (fields.year !== undefined) vehicle.year = fields.year

        // si se va a modificar el tipo de combustible del vehículo
        if (fields.fuelType !== undefined) vehicle.fuel_type = fields.fuelType

        // si se va a modificar la transmisión del vehículo
        if (fields.transmission !== undefined) vehicle.transmission = fields.transmission

        // si se va a modificar el color del vehículo
        if (fields.color !== undefined) vehicle.color = fields.color

        // si se va a modificar el modelo del vehículo
        if (fields.model !== undefined) vehicle.model = fields.model

        // si se va a modificar el kilometraje del vehículo
        if (fields.kilometers !== undefined) vehicle.kilometers = fields.kilometers

        // si se va a modificar la potencia del vehículo
        if (fields.horsepower !== undefined) vehicle.horsepower = fields.horsepower

        // si se va a modificar el precio del vehículo
        if (fields.price !== undefined) vehicle.price = parseInt(fields.price, 10)

        // si se van a modificar las características del vehículo
        if (fields.features !== undefined) vehicle.features = fields.features

        // se se van a modificar los servicios del vehículo
        if (fields.services !== undefined) vehicle.services = fields.services

        // si se va a modificar la descripción del vehículo
        if (fields.description !== undefined) vehicle.description = fields.description

        // si se va a modificar la cilindrada del vehículo
        if (fields.cylinders !== undefined) vehicle.cylinders = fields.cylinders

        if (fields.featured !== undefined) vehicle.featured = fields.featured

        // si se van a eliminar fotos del vehículo
        if (fields.picturesToDelete !== undefined) {
            // eliminando fotos previas del vehículo
            fields.picturesToDelete.forEach(removedPic => {
                let index = vehicle.pictures.findIndex(pic => pic === removedPic)
                // elimina la foto del array de fotos del vehículo
                vehicle.pictures.splice(index, 1)
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

        // guarda el vehículo en la db
        try {
            let updatedVehicle = await vehicle.save()
            res.status(200).send(updatedVehicle)
        } catch (err) {
            res.status(500).send(err)
        }
    })
})

// actualizar fotos del vehículo
router.put('/:id/fotos', upload.array('pictures'), (req, res) => {
    // redimensionando las imágenes subidas del vehículo
    req.files.forEach(file => {
        sharp(`uploads/${file.filename}`)
        .withMetadata()
        .resize(1920, 1080)
        .toBuffer(`uploads/${file.filename}`, (err, data) => {
            if (err) throw err
            fs.writeFile(`uploads/${file.filename}`, data, 'binary', err => {
                if (err) throw err
            })
        })
    })

    Vehicle.findOne({_id: req.params.id})
    .exec(async (err, vehicle) => {
        if (err) return res.status(500).send(err)

        // si el vehículo no existe en la base de datos
        if (vehicle === null) return res.status(404).send('El vehículo no existe')

        // si se van a subir fotos nuevas
        if (req.files.length > 0) {
            let newPictures = req.files.map(pic => `${pic.filename}`)
            vehicle.pictures = [...vehicle.pictures, ...newPictures]
        }

        // guarda el vehículo en la db
        try {
            let updatedVehicle = await vehicle.save()
            res.status(200).send(updatedVehicle)
        } catch (err) {
            res.status(500).send(err)
        }
    })
})

// eliminar vehículo
router.delete('/:id', (req, res) => {
    // mejorar la implementacion del borrado
    Vehicle.findOne({_id: req.params.id})
    .exec((err, vehicle) => {
        if (err) return res.status(500).send(err)

        // si el vehículo no existe en la base de datos
        if (vehicle === null) return res.status(404).send('El vehículo no existe')

        vehicle.pictures.forEach(pic => {
            fs.unlink(`uploads/${pic}`, (err) => {
                if (err) console.log(err)

                console.log(`imagen ${pic} eliminada del servidor`)
            })
        })

        Vehicle.deleteOne({ _id: req.params.id }, (err, response) => {
            if(err) return res.status(500).send(err)

            res.status(200).send(response)
        })
    })
})

module.exports = router