import express from 'express'
import { getFinancingQuery } from '@/application/financing/getFinancingQuery'
import { changeFinancingAction } from '@/application/financing/changeFinancingAction'
import { tryThis } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThis(async(req, res) => {
    const financing = await getFinancingQuery.get()
    res.status(200).send(financing)
}))

router.put('/', tryThis(async(req, res) => {
    const command = { amount: req.body.amount }
    await changeFinancingAction.execute(command)
    res.sendStatus(200)
}))

export default router
