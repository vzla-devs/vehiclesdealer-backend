import express from 'express'
import { createMediaStorageUploader } from '@/infrastructure/factories/persistenceFactory'
import { getVehiclesQuery } from '@/application/vehicles/getVehiclesQuery'
import { getVehicleFiltersQuery } from '@/application/vehicles/getVehicleFiltersQuery'
import { addVehicleAction } from '@/application/vehicles/addVehicleAction'
import { editVehicleAction } from '@/application/vehicles/editVehicleAction'
import { editVehiclePicturesAction } from '@/application/vehicles/editVehiclePicturesAction'
import { removeVehicleAction } from '@/application/vehicles/removeVehicleAction'
import { tryThisAndHandleAnyError } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThisAndHandleAnyError(async (req, res) => {
    const filters = getFiltersFromRequest(req)
    const vehicles = await getVehiclesQuery.getAllFilteredBy(filters)
    res.status(200).send(vehicles)
}))

router.get('/filtros', tryThisAndHandleAnyError(async (req, res) => {
    const filters = await getVehicleFiltersQuery.getAll()
    res.status(200).send(filters)
}))

router.get('/:id', tryThisAndHandleAnyError(async (req, res) => {
    const vehicleId = req.params.id
    const vehicle = await getVehiclesQuery.getOneById(vehicleId)
    res.status(200).send(vehicle)
}))

router.post('/', tryThisAndHandleAnyError(async (req, res) => {
    const command = req.body
    const newVehicleId = await addVehicleAction.execute(command)
    res.status(201).send({ _id: newVehicleId })
}))

router.put('/:id/datos', tryThisAndHandleAnyError((req, res) => {
    const command = { id: req.params.id, ...req.body }
    editVehicleAction.execute(command)
    res.sendStatus(200)
}))

const upload = createMediaStorageUploader('public/uploads')
router.put('/:id/fotos', upload.array('pictures'), tryThisAndHandleAnyError(async (req, res) => {
    const command = { id: req.params.id, files: req.files }
    await editVehiclePicturesAction.execute(command)
    res.sendStatus(200)
}))

router.delete('/:id', tryThisAndHandleAnyError(async (req, res) => {
    await removeVehicleAction.execute(req.params.id)
    res.sendStatus(200)
}))

function getFiltersFromRequest (request) {
    let filters = {}
    filters.type = request.query.type ? request.query.type : undefined
    filters.make = request.query.make ? request.query.make : undefined
    filters.fuel_type = request.query.fuel_type ? request.query.fuel_type : undefined
    filters.transmission = request.query.transmission ? request.query.transmission : undefined
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
