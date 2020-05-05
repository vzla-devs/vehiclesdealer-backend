import express from 'express'
import About from '@/domain/models/about'
import { getAboutQuery } from '@/application/about/getAboutQuery'
import { changeAboutAction } from '@/application/about/changeAboutAction'
import { createMediaStorageUploader } from '@/infrastructure/persistenceFactory'
import { tryThis } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThis(async(req, res) => {
    const about = await getAboutQuery.get()
    res.status(200).send(about)
}))

router.put('/', tryThis(async(req, res) => {
    const command = { text: req.body.text }
    await changeAboutAction.execute(command)
    res.sendStatus(200)
}))

const upload = createMediaStorageUploader('public/assets', 'home_image')
router.put('/imagen', upload.single('picture'), (req, res) => {
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
