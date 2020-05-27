import express from 'express'
import { getFeaturesQuery } from '@/feature/application/getFeaturesQuery'
import { addFeatureAction } from '@/feature/application/addFeatureAction'
import { tryThisDecorator } from '@/shared/infrastructure/controllerDecorators'

const router = express.Router()

router.get('/', tryThisDecorator(async(req, res) => {
    const featureType = req.query.type
    const features = await getFeaturesQuery.getByType(featureType)
    res.status(200).send(features)
}))

router.post('/', tryThisDecorator(async(req, res) => {
    const featureType = req.body.type
    const featuresToAdd = req.body.features
    featuresToAdd.forEach(async featureToAdd => {
        await addFeatureAction.execute({
            type: featureType,
            description: featureToAdd.spanish
        })
    })
    res.sendStatus(200)
}))

export default router
