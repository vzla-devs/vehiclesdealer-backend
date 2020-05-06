import express from 'express'
import { getFinancingQuery } from '@/application/financing/getFinancingQuery'
import { editFinancingAction } from '@/application/financing/editFinancingAction'
import { tryThisAndHandleAnyError } from '@/api/decorators'

const router = express.Router()

router.get('/', tryThisAndHandleAnyError(async(req, res) => {
    const financing = await getFinancingQuery.get()
    res.status(200).send(financing)
}))

router.put('/', tryThisAndHandleAnyError(async(req, res) => {
    const command = { amount: req.body.amount }
    await editFinancingAction.execute(command)
    res.sendStatus(200)
}))

export default router
