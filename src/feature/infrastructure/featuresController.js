import express from 'express'
import { getFeaturesQuery } from '@/application/features/getFeaturesQuery'
import { addFeatureAction } from '@/application/features/addFeatureAction'
import { tryThisAndHandleAnyError } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThisAndHandleAnyError(async(req, res) => {
    const featureType = req.query.type
    const features = await getFeaturesQuery.getByType(featureType)
    res.status(200).send(features)
}))

router.post('/', tryThisAndHandleAnyError(async(req, res) => {
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
