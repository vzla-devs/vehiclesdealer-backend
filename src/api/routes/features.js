import express from 'express'
import Feature from '@/domain/models/feature'
import { getFeaturesQuery } from '@/application/features/getFeaturesQuery'
import { tryThis } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThis(async(req, res) => {
    const featureType = req.query.type
    const features = await getFeaturesQuery.getByType(featureType)
    res.status(200).send(features)
}))

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

export default router
