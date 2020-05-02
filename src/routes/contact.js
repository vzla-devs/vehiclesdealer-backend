const express = require('express')
const router = express.Router()
const Contact = require('../domain/models/contact')

router.get('/', (req, res) => {
    Contact.findOne({}).exec((err, contact) => {
        if (err) return res.status(500).send(err)

        res.status(200).send(contact)
    })
})

router.put('/', async(req, res) => {
    const {
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

    Contact.findOne({})
    .exec(async(err, contact) => {
        if (err) return res.status(500).send(err)

        // si la información de contacto no existe en la base de datos
        if (contact !== null) {
            contact.mobilePhone = mobilePhone
            contact.mainPhone = mainPhone
            contact.emails = emails
            contact.monday = monday
            contact.tuesday = tuesday
            contact.wednesday = wednesday
            contact.thursday = thursday
            contact.friday = friday
            contact.saturday = saturday
        } else {
            contact = new Contact ({
                mobilePhone: mobilePhone,
                mainPhone: mainPhone,
                emails: emails,
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday
            })
        }

        try {
            contact = await contact.save()
            res.status(200).send(contact)
        } catch (err) {
           res.status(500).send(err)
        }
    })
})

module.exports = router
