import express from 'express'
import Financing from '@/domain/models/financing'
import { getFinancingQuery } from '@/application/financing/getFinancingQuery'
const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const financing = await getFinancingQuery.execute()
        res.status(200).send(financing)
    } catch (error) {
        res.status(500).send(err)
    }
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

export default router
