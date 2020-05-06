import express from 'express'
import { UsersFactory } from '@/infrastructure/usersFactory'
import { tryThisAndHandleAnyError } from '@/api/decorators'
import { AddUserCommand } from '@/application/user/addUserAction'

const router = express.Router()

router.post('/', tryThisAndHandleAnyError(async(req, res) => {
  const command: AddUserCommand = {
    username: req.body.username,
    password: req.body.password
  }
  const addUserAction = UsersFactory.getAddUserAction()
  await addUserAction.execute(command)
  res.sendStatus(201)
}))

export default router
