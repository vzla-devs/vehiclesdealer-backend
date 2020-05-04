import express from 'express'
import { getServicesQuery } from '@/application/services/getServicesQuery'
import { addServiceAction } from '@/application/services/addServiceAction'

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const services = await getServicesQuery().execute()
        res.status(200).send(services)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/', async(req, res) => {
    const serviceToAdd = req.body.service
    try {
        const command = { description: serviceToAdd }
        await addServiceAction.execute(command)
        res.status(200).send('ok')
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router
