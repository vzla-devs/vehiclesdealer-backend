import express from 'express'
import { tryThisAndHandleAnyError } from '@/shared/infrastructure/controllerDecorators'
import { DealersFactory } from '@/dealer/infrastructure/dealersFactory'
import { AddDealerServiceCommand } from '@/dealer/application/addDealerServiceAction'

const router = express.Router()

//TODO: create a unit test for this endpoint
router.get('/', tryThisAndHandleAnyError(async(req, res) => {
    const dealerServicesQuery = DealersFactory.GetDealerServicesQuery()
    const services = await dealerServicesQuery.execute()
    res.status(200).send(services)
}))

//TODO: create a unit test for this endpoint
router.post('/', tryThisAndHandleAnyError(async(req, res) => {
    const command: AddDealerServiceCommand = { description: req.body.service }
    const addDealerServicesAction = DealersFactory.AddDealerServiceAction()
    await addDealerServicesAction.execute(command)
    res.sendStatus(200)
}))

export default router
