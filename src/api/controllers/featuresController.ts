import express from 'express'
import { getFeaturesQuery } from '@/vehicles/application/getFeaturesQuery'
import { addFeatureAction } from '@/vehicles/application/addFeatureAction'
import { decorateControllerToCatchAnyError } from '@/api/controllers/controllerDecorators'

const router = express.Router()

router.get('/', decorateControllerToCatchAnyError(async(req, res) => {
    const featureType = req.query.type
    const features = await getFeaturesQuery.getByType(featureType)
    res.status(200).send(features)
}))

router.post('/', decorateControllerToCatchAnyError(async(req, res) => {
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
