import express from 'express'
import { decorateControllerToCatchAnyError } from '@/api/controllers/controllerDecorators'
import { DealerFactory } from '@/dealer/infrastructure/dealerFactory'
import { AddDealerServiceCommand } from '@/dealer/application/actions/addDealerServiceAction'

const router = express.Router()

//TODO: create a unit test for this endpoint
router.get('/', decorateControllerToCatchAnyError(async(req, res) => {
    const dealerServicesQuery = DealerFactory.GetDealerServicesQuery()
    const services = await dealerServicesQuery.execute()
    res.status(200).send(services)
}))

//TODO: create a unit test for this endpoint
router.post('/', decorateControllerToCatchAnyError(async(req, res) => {
    const command: AddDealerServiceCommand = { description: req.body.service }
    const addDealerServicesAction = DealerFactory.AddDealerServiceAction()
    await addDealerServicesAction.execute(command)
    res.sendStatus(200)
}))

export default router
