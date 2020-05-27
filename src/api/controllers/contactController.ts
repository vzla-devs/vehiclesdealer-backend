import express from 'express'
import { getContactQuery } from '@/contact/application/getContactQuery'
import { editContactAction } from '@/contact/application/editContactAction'
import { tryAndCatchAnyErrorDecorator } from '@/shared/infrastructure/controllerDecorators'

const router = express.Router()

router.get('/', tryAndCatchAnyErrorDecorator(async(req, res) => {
    const contact = await getContactQuery.get()
    res.status(200).send(contact)
}))

router.put('/', async(req, res) => {
    let command: any = {}
    if (req.body.mobilePhone !== undefined) command.mobilePhone = req.body.mobilePhone
    if (req.body.mainPhone !== undefined) command.mainPhone = req.body.mainPhone
    if (req.body.emails !== undefined) command.emails = req.body.emails
    if (req.body.monday !== undefined) command.monday = req.body.monday
    if (req.body.tuesday !== undefined) command.tuesday = req.body.tuesday
    if (req.body.wednesday !== undefined) command.wednesday = req.body.wednesday
    if (req.body.thursday !== undefined) command.thursday = req.body.thursday
    if (req.body.friday !== undefined) command.friday = req.body.friday
    if (req.body.saturday !== undefined) command.saturday = req.body.saturday
    await editContactAction.execute(command)
    res.sendStatus(200)
})

export default router
