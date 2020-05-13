import express from 'express'
import { getServicesQuery } from '@/dealers/application/getServicesQuery'
import { addServiceAction } from '@/dealers/application/addServiceAction'
import { tryThisAndHandleAnyError } from '@/shared/infrastructure/controllerDecorators'

const router = express.Router()

router.get('/', tryThisAndHandleAnyError(async(req, res) => {
    const services = await getServicesQuery.getAll()
    res.status(200).send(services)
}))

router.post('/', tryThisAndHandleAnyError(async(req, res) => {
    const command = { description: req.body.service }
    await addServiceAction.execute(command)
    res.sendStatus(200)
}))

export default router
