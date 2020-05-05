import express from 'express'
import { createMediaStorageUploader } from '@/infrastructure/persistenceFactory'
import { getVehiclesQuery } from '@/application/vehicles/getVehiclesQuery'
import { getVehicleFiltersQuery } from '@/application/vehicles/getVehicleFiltersQuery'
import { addVehicleAction } from '@/application/vehicles/addVehicleAction'
import { changeVehicleAction } from '@/application/vehicles/changeVehicleAction'
import { changeVehiclePicturesAction } from '@/application/vehicles/changeVehiclePicturesAction'
import { removeVehicleAction } from '@/application/vehicles/removeVehicleAction'
import { tryThis } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThis(async (req, res) => {
    const filters = getFiltersFromRequest(req)
    const vehicles = await getVehiclesQuery.getAllFilteredBy(filters)
    res.status(200).send(vehicles)
}))

router.get('/filtros', tryThis(async (req, res) => {
    const filters = await getVehicleFiltersQuery.getAll()
    res.status(200).send(filters)
}))

router.get('/:id', tryThis(async (req, res) => {
    const vehicleId = req.params.id
    const vehicle = await getVehiclesQuery.getOneById(vehicleId)
    res.status(200).send(vehicle)
}))

router.post('/', tryThis(async (req, res) => {
    const command = req.body
    const newVehicleId = await addVehicleAction.execute(command)
    res.status(201).send({ _id: newVehicleId })
}))

router.put('/:id/datos', tryThis((req, res) => {
    const command = { id: req.params.id, ...req.body }
    changeVehicleAction.execute(command)
    res.sendStatus(200)
}))

const upload = createMediaStorageUploader('public/uploads')
router.put('/:id/fotos', upload.array('pictures'), tryThis(async (req, res) => {
    const command = { id: req.params.id, files: req.files }
    await changeVehiclePicturesAction.execute(command)
    res.sendStatus(200)
}))

router.delete('/:id', tryThis(async (req, res) => {
    await removeVehicleAction.execute(req.params.id)
    res.sendStatus(200)
}))

function getFiltersFromRequest (request) {
    let filters = {}
    // si filtra por tipo de vehículo
    if (request.query.type !== undefined) {
        filters.type = request.query.type
    }
    // si filtra por marca
    if (request.query.make !== undefined) {
        filters.make = request.query.make
    }
    // si filtra por tipo de combustible
    if (request.query.fuel_type !== undefined) {
        filters.fuel_type = request.query.fuel_type
    }
    // si filtra por tipo de transmisión
    if (request.query.transmission !== undefined) {
        filters.transmission = request.query.transmission
    }
    // si filtra por año
    if (request.query.minYear !== undefined || request.query.maxYear !== undefined) {
        let yearRange = {}
        if (request.query.minYear !== undefined) yearRange.$gte = parseInt(request.query.minYear, 10)
        if (request.query.maxYear !== undefined) yearRange.$lte = parseInt(request.query.maxYear, 10)
        filters.year = yearRange
    }
    // si filtra por precio
    if (request.query.minPrice !== undefined || request.query.maxPrice !== undefined) {
        let priceRange = {}
        if (request.query.minPrice !== undefined) priceRange.$gte = parseInt(request.query.minPrice, 10)
        if (request.query.maxPrice !== undefined) priceRange.$lte = parseInt(request.query.maxPrice, 10)
        filters.price = priceRange
    }
    // si filtra por kilometraje
    if (request.query.minKilometers !== undefined || request.query.maxKilometers !== undefined) {
        let kilometersRange = {}
        if (request.query.minKilometers !== undefined) kilometersRange.$gte = parseInt(request.query.minKilometers, 10)
        if (request.query.maxKilometers !== undefined) kilometersRange.$lte = parseInt(request.query.maxKilometers, 10)
        filters.kilometers = kilometersRange
    }
    return filters
}

export default router
