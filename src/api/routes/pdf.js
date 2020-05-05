import express from 'express'
import { getPictureQuery } from '@/application/pictures/getPictureQuery'
import { tryThis } from '@/api/decorators'

const router = express.Router()

router.get('/:picture', tryThis((req, res) => {
    const pictureToGet = req.params.picture
    const pictureData = getPictureQuery.getAsBase64(pictureToGet)
    res.status(200).send(pictureData)
}))

export default router
