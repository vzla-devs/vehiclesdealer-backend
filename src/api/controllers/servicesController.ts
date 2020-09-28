import express from 'express'
import { getServicesQuery } from '@/vehicles/application/getServicesQuery'
import { addServiceAction } from '@/vehicles/application/addServiceAction'
import { decorateControllerToCatchAnyError } from '@/api/controllers/controllerDecorators'
import { AddDealerServiceCommand } from '@/dealer/application/actions/addDealerServiceAction'

const router = express.Router()

//TODO: create a unit test for this endpoint
router.get('/', decorateControllerToCatchAnyError(async(req, res) => {
    const services = await getServicesQuery.getAll()
    res.status(200).send(services)
}))

//TODO: create a unit test for this endpoint
router.post('/', decorateControllerToCatchAnyError(async(req, res) => {
    const command: AddDealerServiceCommand = { description: req.body.service }
    await addServiceAction.execute(command)
    res.sendStatus(200)
}))

export default router
