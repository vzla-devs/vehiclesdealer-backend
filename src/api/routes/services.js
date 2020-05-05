import express from 'express'
import { getServicesQuery } from '@/application/services/getServicesQuery'
import { addServiceAction } from '@/application/services/addServiceAction'
import { tryThis } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThis(async(req, res) => {
    const services = await getServicesQuery.getAll()
    res.status(200).send(services)
}))

router.post('/', tryThis(async(req, res) => {
    const command = { description: req.body.service }
    await addServiceAction.execute(command)
    res.sendStatus(200)
}))

export default router
