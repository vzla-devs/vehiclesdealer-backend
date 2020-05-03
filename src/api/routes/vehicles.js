import express from 'express'
import { createMediaStorageUploader } from '@/infrastructure/persistenceFactory'
import { getVehiclesQuery } from '@/application/getVehiclesQuery'
import { getVehicleFiltersQuery } from '@/application/getVehicleFiltersQuery'
import { addVehicleAction } from '@/application/addVehicleAction'
import { editVehicleAction } from '@/application/editVehicleAction'
import { editVehiclePicturesAction } from '@/application/editVehiclePicturesAction'
import { removeVehicleAction } from '@/application/removeVehicleAction'

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

router.get('/filtros', async (req, res) => {
    try {
        const filters = await getVehicleFiltersQuery.getVehicleFilters()
        res.status(200).send(filters)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const vehicle = await getVehiclesQuery.getOneById(req.params.id)
        res.status(200).send(vehicle)
    } catch (error) {
        if (error) return res.status(500).send(err)
    }
})

router.post('/', async (req, res) => {
    const command = req.body
    try {
        const newVehicle = await addVehicleAction.execute(command)
        res.status(201).send(newVehicle)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/:id/datos', async (req, res) => {
    const command = req.body
    try {
        const updatedVehicle = await editVehicleAction.execute(command)
        res.status(200).send(updatedVehicle)
    } catch (err) {
        res.status(500).send(err)
    }
})

const upload = createMediaStorageUploader('public/uploads')
router.put('/:id/fotos', upload.array('pictures'), async (req, res) => {
    const command = { id: req.params.id, files: req.files }
    try {
        await editVehiclePicturesAction.execute(command)
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await removeVehicleAction.execute(req.params.id)
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

export default router