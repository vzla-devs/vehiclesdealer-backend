import express from 'express'
import { editAboutAction } from '@/about/application/editAboutObsoleteAction'
import { createMediaStorageUploader } from '@/shared/infrastructure/persistenceFactory'
import { decorateControllerAndCatchAnyError } from '@/api/infrastructure/controllerDecorators'
import { DealerFactory } from '@/dealer/infrastructure/dealerFactory'

const router = express.Router()

router.get('/', decorateControllerAndCatchAnyError(async(req, res) => {
    const getDealerDescriptionQuery = DealerFactory.GetDealerDescriptionQuery()
    const description = await getDealerDescriptionQuery.execute()
    res.status(200).send(description)
}))

router.put('/', decorateControllerAndCatchAnyError(async(req, res) => {
    const command = { text: req.body.text }
    await editAboutAction.execute(command)
    res.sendStatus(200)
}))

const upload = createMediaStorageUploader('public/assets', 'home_image')
router.put('/imagen', upload.single('picture'), decorateControllerAndCatchAnyError(async(req, res) => {
    const command = { picture: req.file.filename }
    await editAboutAction.execute(command)
    res.sendStatus(200)
}))

export default router
