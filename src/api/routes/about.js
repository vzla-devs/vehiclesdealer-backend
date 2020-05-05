import express from 'express'
import About from '@/domain/models/about'
import fs from 'fs'
import { getAboutQuery } from '@/application/about/getAboutQuery'
import { createMediaStorageUploader } from '@/infrastructure/persistenceFactory'
import { tryThis } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThis(async(req, res) => {
    const about = await getAboutQuery.get()
    res.status(200).send(about)
}))

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

const upload = createMediaStorageUploader('assets', 'home_image')
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

export default router
