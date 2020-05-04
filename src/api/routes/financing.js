import express from 'express'
import { getFinancingQuery } from '@/application/financing/getFinancingQuery'
import { changeFinancingAction } from '@/application/financing/changeFinancingAction'

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const financing = await getFinancingQuery.get()
        res.status(200).send(financing)
    } catch (error) {
        res.status(500).send(err)
    }
})

router.put('/', async(req, res) => {
    const command = { amount: req.body.amount }
    try {
        await changeFinancingAction.execute(command)
        res.status(200).send('ok')
    } catch (error) {
        res.status(500).send(err)
    }
})

export default router
