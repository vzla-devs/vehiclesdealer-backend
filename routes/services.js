const express = require('express')
const router = express.Router()
const Service = require('../models/service')

router.get('/', (req, res) => {
    Service.find({}).exec((err, services) => {
        if (err) return res.status(500).send(err)

        service = services.sort((a, b) => {
            if (a.spanish > b.spanish) return 1;
        })
        res.status(200).send(services)
    })
})

router.post('/', async(req, res) => {
    const services = req.body.services
    // mapea todas las características para guardarlas individualmente
    let newServices = await services.map(async element => {
        let service = new Service ({
            spanish: element
        })
        // guarda el coche en la db
        try {
            return service.save()
        // si ocurre un error al intentar guardar el coche en la base de datos
        } catch (err) {
            return err
        }
    })
    res.status(200).send('ok')
})

module.exports = router