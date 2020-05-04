import express from 'express'
import Service from '@/domain/models/service'

const router = express.Router()

router.get('/', (req, res) => {
    Service.find({}).exec((err, services) => {
        if (err) return res.status(500).send(err)

        services = services.sort((a, b) => {
            if (a.spanish > b.spanish) return 1
            return 0
        })
        res.status(200).send(services)
    })
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
