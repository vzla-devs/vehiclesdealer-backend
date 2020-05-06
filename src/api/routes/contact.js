import express from 'express'
import { getContactQuery } from '@/application/contact/getContactQuery'
import { editContactAction } from '@/application/contact/editContactAction'
import { tryThis } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThis(async(req, res) => {
    const contact = await getContactQuery.get()
    res.status(200).send(contact)
}))

router.put('/', async(req, res) => {
    const command = {}
    command.mobilePhone = req.body.mobilePhone ? req.body.mobilePhone : undefined
    command.mainPhone = req.body.mainPhone ? req.body.mainPhone : undefined
    command.emails = req.body.emails ? req.body.emails : undefined
    command.monday = req.body.monday ? req.body.monday : undefined
    command.tuesday = req.body.tuesday ? req.body.tuesday : undefined
    command.wednesday = req.body.wednesday ? req.body.wednesday : undefined
    command.thursday = req.body.thursday ? req.body.thursday : undefined
    command.friday = req.body.friday ? req.body.friday : undefined
    command.saturday = req.body.saturday ? req.body.saturday : undefined
    await editContactAction.execute(command)
    res.sendStatus(200)
})

export default router
