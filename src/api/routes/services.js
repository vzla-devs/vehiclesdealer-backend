import express from 'express'
import { getServicesQuery } from '@/application/getServicesQuery'
import { addServiceAction } from '@/application/addServiceAction'

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
    const servicesToAdd = req.body.services
    await servicesToAdd.map(async serviceToAdd => {
        try {
            const command = { description: serviceToAdd }
            await addServiceAction.execute(command)
            res.status(200).send('ok')
        } catch (error) {
            res.status(500).send(error)
        }
    })
})

export default router
