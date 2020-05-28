import express from 'express'
import { createMediaStorageUploader } from '@/shared/infrastructure/persistenceFactory'
import { decorateControllerToCatchAnyError } from '@/api/controllers/controllerDecorators'
import { DealerFactory } from '@/dealer/infrastructure/dealerFactory'

const router = express.Router()

router.get('/', decorateControllerToCatchAnyError(async(req, res) => {
    const getDealerDescriptionQuery = DealerFactory.GetDealerDescriptionQuery()
    const description = await getDealerDescriptionQuery.execute()
    res.status(200).send(description)
}))

router.put('/', decorateControllerToCatchAnyError(async(req, res) => {
    const changeDealerDescriptionAction = DealerFactory.ChangeDealerDescriptionAction()
    const newDescription = req.body.text
    await changeDealerDescriptionAction.execute(newDescription)
    res.sendStatus(200)
}))

const upload = createMediaStorageUploader('public/assets', 'home_image')
router.put('/imagen', upload.single('picture'), decorateControllerToCatchAnyError(async(req, res) => {
    res.sendStatus(200)
}))

export default router
