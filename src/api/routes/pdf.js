import express from 'express'
import { getPictureAsBase64Query } from '@/application/pictures/getPictureAsBase64Query'

const router = express.Router()

router.get('/:picture', (req, res) => {
    const pictureToGet = req.params.picture
    try {
        const pictureData = getPictureAsBase64Query.execute(pictureToGet)
        res.status(200).send(pictureData)
    } catch (error) {
        res.status(500).send(err)
    }
})

export default router
