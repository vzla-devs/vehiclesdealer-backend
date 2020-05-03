const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:picture', (req, res) => {
    const file = req.params.picture
    const dotIndex = file.indexOf('.')
    const format = file.substring(dotIndex + 1, file.length)
    const appendData = `data:image/${format};base64,`

    fs.readFile(`uploads/${file}`, (err, data) => {
        if (err) return res.status(500).send(err)
        const base64 = appendData + data.toString('base64')
        return res.status(200).send({
            base64,
            format
        })
      })
})

module.exports = router