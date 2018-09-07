const express = require('express')
const router = express.Router()
const Feature = require('../models/feature')

router.get('/', (req, res) => {
    Feature.find({}).exec((err, features) => {
        if (err) return res.status(500).send(err)

        features = features.sort((a, b) => {
            if (a.spanish > b.spanish) return 1;
        })
        res.status(200).send(features)
    })
})

router.post('/', async(req, res) => {
    const features = req.body.features
    // mapea todas las características para guardarlas individualmente
    let newFeatures = await features.map(async element => {
        let feature = new Feature ({
            spanish: element.spanish
        })
        // guarda el coche en la db
        try {
            return feature.save()
        // si ocurre un error al intentar guardar el coche en la base de datos
        } catch (err) {
            return err
        }
    })
    res.status(200).send('ok')
})

module.exports = router