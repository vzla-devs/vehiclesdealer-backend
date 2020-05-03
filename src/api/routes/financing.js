const express = require('express')
const router = express.Router()
const Financing = require('../../domain/models/financing')

router.get('/', (req, res) => {
    Financing.findOne({}).exec((err, financing) => {
        if (err) return res.status(500).send(err)

        res.status(200).send(financing)
    })
})

router.put('/', async(req, res) => {
    const { amount } = req.body

    Financing.findOne({})
    .exec(async(err, financing) => {
        if (err) return res.status(500).send(err)
        
        if (financing !== null) {
            financing.amount = amount
        } else {
            financing = new Financing ({ amount })
        }
        
        try {
            financing = await financing.save()
            res.status(200).send(financing)
        } catch (err) {
           res.status(500).send(err)
        }
    })
})

module.exports = router
