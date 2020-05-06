import express from 'express'
import { getFinancingQuery } from '@/application/financing/getFinancingQuery'
import { editFinancingAction } from '@/application/financing/editFinancingAction'
import { tryThis } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThis(async(req, res) => {
    const financing = await getFinancingQuery.get()
    res.status(200).send(financing)
}))

router.put('/', tryThis(async(req, res) => {
    const command = { amount: req.body.amount }
    await editFinancingAction.execute(command)
    res.sendStatus(200)
}))

export default router
