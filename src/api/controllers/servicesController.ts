import express from 'express'
import { addServiceAction } from '@/dealer/application/addServiceObsoleteAction'
import { tryThisAndHandleAnyError } from '@/shared/infrastructure/controllerDecorators'
import { DealersFactory } from '@/dealer/infrastructure/dealersFactory'

const router = express.Router()

//TODO: create a unit test for this endpoint
router.get('/', tryThisAndHandleAnyError(async(req, res) => {
    const dealerServicesQuery = DealersFactory.GetDealerServicesQuery()
    const services = await dealerServicesQuery.execute()
    res.status(200).send(services)
}))

router.post('/', tryThisAndHandleAnyError(async(req, res) => {
    const command = { description: req.body.service }
    await addServiceAction.execute(command)
    res.sendStatus(200)
}))

export default router
