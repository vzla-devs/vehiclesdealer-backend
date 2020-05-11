import express from 'express'
import { getPictureQuery } from '@/shared/application/getPictureQuery'
import { tryThisAndHandleAnyError } from '@/shared/infrastructure/controllerDecorators'

const router = express.Router()

router.get('/:picture', tryThisAndHandleAnyError((req, res) => {
    const pictureToGet = req.params.picture
    const pictureData = getPictureQuery.getAsBase64(pictureToGet)
    res.status(200).send(pictureData)
}))

export default router
