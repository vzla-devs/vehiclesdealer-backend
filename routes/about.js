const express = require('express')
const router = express.Router()
const About = require('../models/about')

router.get('/', (req, res) => {
    About.findOne({}).exec((err, about) => {
        if (err) return res.status(500).send(err)

        res.status(200).send(about)
    })
})

router.put('/', (req, res) => {
    const {
        text
    } = req.body

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

module.exports = router