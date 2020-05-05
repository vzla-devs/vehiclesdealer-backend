import express from 'express'
import { getContactQuery } from '@/application/contact/getContactQuery'
import { changeContactAction } from '@/application/contact/changeContactAction'
import { tryThis } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThis(async(req, res) => {
    const contact = await getContactQuery.get()
    res.status(200).send(contact)
}))

router.put('/', async(req, res) => {
    const command = {
        mobilePhone,
        mainPhone,
        emails,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday
    } = req.body
    await changeContactAction.execute(command)
    res.sendStatus(200)
})

export default router
