import express from 'express'
import { decorateControllerToCatchAnyError } from '@/api/controllers/controllerDecorators'
import { DealerFactory } from '@/dealer/infrastructure/dealerFactory'
import { ChangeDealerContactInformationCommand } from '@/dealer/application/actions/changeDealerContactInformationAction'

const router = express.Router()

router.get('/', decorateControllerToCatchAnyError(async(req, res) => {
    const getDealerContactInformationQuery = DealerFactory.GetDealerContactInformationQuery()
    const dealerContactInformation = await getDealerContactInformationQuery.execute()
    res.status(200).send(dealerContactInformation)
}))

router.put('/', decorateControllerToCatchAnyError(async(req, res) => {
    const command: ChangeDealerContactInformationCommand = {
        emails: req.body.emails,
        mobilePhone: req.body.mobilePhone,
        mainPhone: req.body.mainPhone,
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        wednesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday,
        saturday: req.body.saturday
    }
    const changeContactInformationAction = DealerFactory.ChangeDealerContactInformationAction()
    await changeContactInformationAction.execute(command)
    res.sendStatus(200)
}))

export default router
