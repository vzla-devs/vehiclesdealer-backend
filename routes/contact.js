const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')

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

    let contact = new Contact ({
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

    try {
        await contact.save()
        res.status(200).send('OK')
    } catch (err) {
       res.status(500).send(err)
    }
})

module.exports = router