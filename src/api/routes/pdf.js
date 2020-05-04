import express from 'express'
import { getPictureQuery } from '@/application/pictures/getPictureQuery'

const router = express.Router()

router.get('/:picture', (req, res) => {
    const pictureToGet = req.params.picture
    try {
        const pictureData = getPictureQuery.getAsBase64(pictureToGet)
        res.status(200).send(pictureData)
    } catch (error) {
        res.status(500).send(err)
    }
})

export default router
