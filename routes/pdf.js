const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        let filename = Date.now()
        switch (file.mimetype) {
            case 'image/png':
            filename = filename + '.png'
            break;
            case 'image/jpeg':
            filename = filename + '.jpeg'
            break;
        }
        cb(null, filename);
    }
})

router.get('/:picture', (req, res) => {
    fs.readFile(`uploads/${req.params.picture}`, (err, data) => {
        if (err) return res.status(500).send(err)
        const base64 = data.toString('base64')
        return res.status(200).send({ base64 })
      })
})

module.exports = router