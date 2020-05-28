import express from 'express'
import { getPictureQuery } from '@/picture/application/getPictureQuery'
import { decorateControllerToCatchAnyError } from '@/api/controllers/controllerDecorators'

const router = express.Router()

router.get('/:picture', decorateControllerToCatchAnyError((req, res) => {
    const pictureToGet = req.params.picture
    const pictureData = getPictureQuery.getAsBase64(pictureToGet)
    res.status(200).send(pictureData)
}))

export default router
