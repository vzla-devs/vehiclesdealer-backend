import express from 'express'
import { createMediaStorageUploader } from '@/infrastructure/persistenceFactory'
import { getVehiclesQuery } from '@/application/vehicles/getVehiclesQuery'
import { getVehicleFiltersQuery } from '@/application/vehicles/getVehicleFiltersQuery'
import { addVehicleAction } from '@/application/vehicles/addVehicleAction'
import { changeVehicleAction } from '@/application/vehicles/changeVehicleAction'
import { changeVehiclePicturesAction } from '@/application/vehicles/changeVehiclePicturesAction'
import { removeVehicleAction } from '@/application/vehicles/removeVehicleAction'

const router = express.Router()

router.get('/', async (req, res) => {
    const filters = getFiltersFromRequest(req)
    try {
        const vehicles = await getVehiclesQuery.getAllFilteredBy(filters)
        res.status(200).send(vehicles)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/filtros', async (req, res) => {
    try {
        const filters = await getVehicleFiltersQuery.getAll()
        res.status(200).send(filters)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    const vehicleId = req.params.id
    try {
        const vehicle = await getVehiclesQuery.getOneById(vehicleId)
        res.status(200).send(vehicle)
    } catch (error) {
        res.status(500).send(err)
    }
})

router.post('/', async (req, res) => {
    const command = req.body
    try {
        const newVehicleId = await addVehicleAction.execute(command)
        res.status(201).send({ _id: newVehicleId })
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/:id/datos', (req, res) => {
    const command = { id: req.params.id, ...req.body }
    try {
        changeVehicleAction.execute(command)
        res.status(200).send('ok')
    } catch (err) {
        res.status(500).send(err)
    }
})

const upload = createMediaStorageUploader('public/uploads')
router.put('/:id/fotos', upload.array('pictures'), async (req, res) => {
    const command = { id: req.params.id, files: req.files }
    try {
        await changeVehiclePicturesAction.execute(command)
        res.status(200).send('ok')
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await removeVehicleAction.execute(req.params.id)
        res.status(200).send('ok')
    } catch (err) {
        res.status(500).send(err)
    }
})

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
