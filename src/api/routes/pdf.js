import express from 'express'
import fs from 'fs'
const router = express.Router()

router.get('/:picture', (req, res) => {
    const pictureToGet = req.params.picture
    const dotSeparatorPosition = pictureToGet.indexOf('.')
    const pictureFormat = pictureToGet.substring(dotSeparatorPosition + 1, pictureToGet.length)
    const pictureFormatData = `data:image/${pictureFormat};base64,`

    fs.readFile(`public/uploads/${pictureToGet}`, (err, data) => {
        if (err) return res.status(500).send(err)
        const base64 = pictureFormatData + data.toString('base64')
        return res.status(200).send({ base64, format: pictureFormat })
      })
})

export default router
