import express from 'express'
import { getServicesQuery } from '@/application/getServicesQuery'

const router = express.Router()

router.get('/', (req, res) => {
    try {
        const services = await getServicesQuery().execute()
        res.status(200).send(services)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/', async(req, res) => {
    const services = req.body.services
    // mapea todas las características para guardarlas individualmente
    let newServices = await services.map(async s => {
        let service = new Service ({
            spanish: s
        })
        // guarda el vehículo en la db
        try {
            return service.save()
        // si ocurre un error al intentar guardar el vehículo en la base de datos
        } catch (err) {
            return err
        }
    })
    res.status(200).send('ok')
})

export default router
