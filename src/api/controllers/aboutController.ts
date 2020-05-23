import express from 'express'
import { getAboutQuery } from '@/about/application/getAboutObsoleteQuery'
import { editAboutAction } from '@/about/application/editAboutObsoleteAction'
import { createMediaStorageUploader } from '@/shared/infrastructure/persistenceFactory'
import { tryThisAndHandleAnyError } from '@/shared/infrastructure/controllerDecorators'

const router = express.Router()

router.get('/', tryThisAndHandleAnyError(async(req, res) => {
    const about = await getAboutQuery.get()
    res.status(200).send(about)
}))

router.put('/', tryThisAndHandleAnyError(async(req, res) => {
    const command = { text: req.body.text }
    await editAboutAction.execute(command)
    res.sendStatus(200)
}))

const upload = createMediaStorageUploader('public/assets', 'home_image')
router.put('/imagen', upload.single('picture'), tryThisAndHandleAnyError(async(req, res) => {
    const command = { picture: req.file.filename }
    await editAboutAction.execute(command)
    res.sendStatus(200)
}))

export default router
