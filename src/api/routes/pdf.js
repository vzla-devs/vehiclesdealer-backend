const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:picture', (req, res) => {
    const file = req.params.picture
    const dotIndex = file.indexOf('.')
    const format = file.substring(dotIndex + 1, file.length)
    const pictureFormatData = `data:image/${format};base64,`

    fs.readFile(`public/uploads/${file}`, (err, data) => {
        if (err) return res.status(500).send(err)
        const base64 = pictureFormatData + data.toString('base64')
        return res.status(200).send({
            base64,
            format
        })
      })
})

module.exports = router
