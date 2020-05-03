import express from 'express'
import Vehicle from '@/domain/models/vehicle'
import fs from 'fs'
import sharp from 'sharp'
import { createMediaStorageUploader } from '@/infrastructure/persistenceFactory'
import { getVehiclesQuery } from '@/application/getVehiclesQuery'

const router = express.Router()

router.get('/', async (req, res) => {
    const filters = getFiltersFromQuery(req.query)
    try {
        const vehicles = await getVehiclesQuery.getAllFilteredBy(filters)
        res.status(200).send(vehicles)
    } catch (error) {
        res.status(500).send(error)
    }
})

function getFiltersFromQuery (query) {
    let filters = {}

    // si filtra por tipo de vehículo
    if (query.type !== undefined) {
        filters.type = query.type
    }

    // si filtra por marca
    if (query.make !== undefined) {
        filters.make = query.make
    }

    // si filtra por tipo de combustible
    if (query.fuel_type !== undefined) {
        filters.fuel_type = query.fuel_type
    }

    // si filtra por tipo de transmisión
    if (query.transmission !== undefined) {
        filters.transmission = query.transmission
    }

    // si filtra por año
    if (query.minYear !== undefined || query.maxYear !== undefined) {
        
        let yearRange = {}

        if (query.minYear !== undefined) yearRange.$gte = parseInt(query.minYear, 10)

        if (query.maxYear !== undefined) yearRange.$lte = parseInt(query.maxYear, 10)

        filters.year = yearRange
    }

    // si filtra por precio
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
        
        let priceRange = {}

        if (query.minPrice !== undefined) priceRange.$gte = parseInt(query.minPrice, 10)

        if (query.maxPrice !== undefined) priceRange.$lte = parseInt(query.maxPrice, 10)

        filters.price = priceRange
    }

    // si filtra por kilometraje
    if (query.minKilometers !== undefined || query.maxKilometers !== undefined) {
        
        let kilometersRange = {}

        if (query.minKilometers !== undefined) kilometersRange.$gte = parseInt(query.minKilometers, 10)

        if (query.maxKilometers !== undefined) kilometersRange.$lte = parseInt(query.maxKilometers, 10)

        filters.kilometers = kilometersRange
    }
    return filters
}

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
        featured: fields.featured,
        emissions: fields.emissions
    })

    // guarda el vehículo en la db
    try {
        let newVehicle = await vehicle.save()
        res.status(201).send(newVehicle)
    // si ocurre un error al intentar guardar el vehículo en la base de datos
    } catch (err) {
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

        if (vehicle === null) return res.status(404).send('El vehículo no existe')
        if (fields.make !== undefined) vehicle.make = fields.make
        if (fields.year !== undefined) vehicle.year = fields.year
        if (fields.fuelType !== undefined) vehicle.fuel_type = fields.fuelType
        if (fields.transmission !== undefined) vehicle.transmission = fields.transmission
        if (fields.color !== undefined) vehicle.color = fields.color
        if (fields.model !== undefined) vehicle.model = fields.model
        if (fields.kilometers !== undefined) vehicle.kilometers = fields.kilometers
        if (fields.horsepower !== undefined) vehicle.horsepower = fields.horsepower
        if (fields.price !== undefined) vehicle.price = parseInt(fields.price, 10)
        if (fields.features !== undefined) vehicle.features = fields.features
        if (fields.services !== undefined) vehicle.services = fields.services
        if (fields.description !== undefined) vehicle.description = fields.description
        if (fields.cylinders !== undefined) vehicle.cylinders = fields.cylinders
        if (fields.featured !== undefined) vehicle.featured = fields.featured
        if (fields.emissions !== undefined) vehicle.emissions = fields.emissions

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

const upload = createMediaStorageUploader('uploads', Date.now())
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

export default router
