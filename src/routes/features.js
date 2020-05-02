const express = require('express')
const router = express.Router()
const Feature = require('../domain/models/feature')

router.get('/', (req, res) => {
    Feature.find({}).exec((err, features) => {
        if (err) return res.status(500).send(err)

        features = features.sort((a, b) => {
            if (a.spanish > b.spanish) return 1
            return 0
        })
        res.status(200).send(features)
    })
})

router.get('/coches', (req, res) => {
    Feature.find({ type: 'car' }).exec((err, features) => {
        if (err) return res.status(500).send(err)

        features = features.sort((a, b) => {
            if (a.spanish > b.spanish) return 1
            return 0
        })
        res.status(200).send(features)
    })
})

router.get('/motos', (req, res) => {
    Feature.find({ type: 'motorcycle' }).exec((err, features) => {
        if (err) return res.status(500).send(err)

        features = features.sort((a, b) => {
            if (a.spanish > b.spanish) return 1
            return 0
        })
        res.status(200).send(features)
    })
})

router.post('/', async(req, res) => {
    const type = req.body.type
    const features = req.body.features
    // mapea todas las características para guardarlas individualmente
    let newFeatures = await features.map(async f => {
        let feature = new Feature ({
            type: type,
            spanish: f.spanish
        })
        // guarda la característica en la db
        try {
            return feature.save()
        // si ocurre un error al intentar guardar la característica en la base de datos
        } catch (err) {
            return err
        }
    })
    res.status(200).send(newFeatures)
})

module.exports = router
