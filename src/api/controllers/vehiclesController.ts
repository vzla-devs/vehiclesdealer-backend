import express from 'express'
import { createMediaStorageUploader } from '@/shared/infrastructure/persistenceFactory'
import { getVehiclesQuery } from '@/vehicles/application/getVehiclesQuery'
import { getVehicleFiltersQuery } from '@/vehicles/application/getVehicleFiltersQuery'
import { addVehicleAction } from '@/vehicles/application/addVehicleAction'
import { editVehicleAction } from '@/vehicles/application/editVehicleAction'
import { editVehiclePicturesAction } from '@/vehicles/application/editVehiclePicturesAction'
import { removeVehicleAction } from '@/vehicles/application/removeVehicleAction'
import { decorateControllerToCatchAnyError } from '@/api/controllers/controllerDecorators'

const router = express.Router()

router.get('/', decorateControllerToCatchAnyError(async (req, res) => {
    const filters = getFiltersFromRequest(req)
    const vehicles = await getVehiclesQuery.getAllFilteredBy(filters)
    res.status(200).send(vehicles)
}))

router.get('/filtros', decorateControllerToCatchAnyError(async (req, res) => {
    const filters = await getVehicleFiltersQuery.getAll()
    res.status(200).send(filters)
}))

router.get('/marcas', decorateControllerToCatchAnyError(async (req, res) => {
    const brands = [
        'abarth',
        'alfa romeo',
        'audi',
        'bmw',
        'chevrolet',
        'citroën',
        'dacia',
        'fiat',
        'ford',
        'honda',
        'hyundai',
        'jeep',
        'kia',
        'lexus',
        'mazda',
        'mercedes-benz',
        'mini',
        'mitsubishi',
        'nissan',
        'opel',
        'peugeot',
        'renault',
        'seat',
        'skoda',
        'smart',
        'subaru',
        'suzuki',
        'toyota',
        'volkswagen',
        'volvo'
    ]
    res.status(200).send(brands)
}))

router.get('/:id', decorateControllerToCatchAnyError(async (req, res) => {
    const vehicleId = req.params.id
    const vehicle = await getVehiclesQuery.getOneById(vehicleId)
    res.status(200).send(vehicle)
}))

router.post('/', decorateControllerToCatchAnyError(async (req, res) => {
    const command = req.body
    const newVehicleId = await addVehicleAction.execute(command)
    res.status(201).send({ _id: newVehicleId })
}))

router.put('/:id/datos', decorateControllerToCatchAnyError((req, res) => {
    const command = { id: req.params.id, ...req.body }
    editVehicleAction.execute(command)
    res.sendStatus(200)
}))

const upload = createMediaStorageUploader('public/uploads')
router.put('/:id/fotos', upload.array('pictures'), decorateControllerToCatchAnyError(async (req, res) => {
    const command = { id: req.params.id, files: req.files }
    await editVehiclePicturesAction.execute(command)
    res.sendStatus(200)
}))

router.delete('/:id', decorateControllerToCatchAnyError(async (req, res) => {
    await removeVehicleAction.execute(req.params.id)
    res.sendStatus(200)
}))


function getFiltersFromRequest (request) {
    let filters: any = {}
    if (request.query.type !== undefined) {
        filters.type = request.query.type
    }
    if (request.query.make !== undefined) {
        filters.make = request.query.make
    }
    if (request.query.fuel_type !== undefined) {
        filters.fuel_type = request.query.fuel_type
    }
    if (request.query.transmission !== undefined) {
        filters.transmission = request.query.transmission
    }
    if (request.query.minYear !== undefined || request.query.maxYear !== undefined) {
        let yearRange: any = {}
        if (request.query.minYear !== undefined) yearRange.$gte = parseInt(request.query.minYear, 10)
        if (request.query.maxYear !== undefined) yearRange.$lte = parseInt(request.query.maxYear, 10)
        filters.year = yearRange
    }
    // si filtra por precio
    if (request.query.minPrice !== undefined || request.query.maxPrice !== undefined) {
        let priceRange: any = {}
        if (request.query.minPrice !== undefined) priceRange.$gte = parseInt(request.query.minPrice, 10)
        if (request.query.maxPrice !== undefined) priceRange.$lte = parseInt(request.query.maxPrice, 10)
        filters.price = priceRange
    }
    // si filtra por kilometraje
    if (request.query.minKilometers !== undefined || request.query.maxKilometers !== undefined) {
        let kilometersRange: any = {}
        if (request.query.minKilometers !== undefined) kilometersRange.$gte = parseInt(request.query.minKilometers, 10)
        if (request.query.maxKilometers !== undefined) kilometersRange.$lte = parseInt(request.query.maxKilometers, 10)
        filters.kilometers = kilometersRange
    }
    return filters
}

export default router
