const express = require('express')
const router = express.Router()
const About = require('../domain/models/about')
const fs = require('fs')
import { createMediaStorageUploader } from '../infrastructure/persistenceFactory'
const upload = createMediaStorageUploader('assets', 'home_image')

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
