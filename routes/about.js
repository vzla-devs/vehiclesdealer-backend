const express = require('express')
const router = express.Router()
const About = require('../models/about')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const sharp = require('sharp')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets')
    },
    filename: function(req, file, cb) {
        let filename = 'home_image'
        switch (file.mimetype) {
            case 'image/png':
            filename = `${filename}.png`
            break
            case 'image/jpeg':
            filename = `${filename}.jpeg`
            break
        }
        cb(null, filename)
    }
})
const upload = multer({ storage: storage })

router.get('/', (req, res) => {
    About.findOne({}).exec((err, about) => {
        if (err) return res.status(500).send(err)

        res.status(200).send(about)
    })
})

router.put('/', (req, res) => {
    const { text } = req.body

    About.findOne({})
    .exec(async(err, about) => {
        if (err) return res.status(500).send(err)

        // si la información de contacto no existe en la base de datos
        if (about !== null) {
            about.text = text
        } else {
            about = new About ({
                text: text
            })
        }

        try {
            about = await about.save()
            res.status(200).send(about)
        } catch (err) {
           res.status(500).send(err)
        }
    })
})

router.put('/imagen', upload.single('picture'), (req, res) => {
    req.file.sharp(`assets/${file.filename}`)
        .withMetadata()
        .resize(1920, 1080)
        .toBuffer(`assets/${file.filename}`, (err, data) => {
            if (err) throw err
            fs.writeFile(`assets/${file.filename}`, data, 'binary', err => {
                if (err) throw err
            })
        })

    About.findOne({})
    .exec(async(err, about) => {
        if (err) return res.status(500).send(err)

        about.picture = req.file.filename

        try {
            about = await about.save()
            res.status(200).send(about)
        } catch (err) {
            res.status(500).send(err)
        }
    })
})

module.exports = router