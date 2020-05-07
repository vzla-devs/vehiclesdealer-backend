import express from 'express'
import { UsersFactory } from '@/infrastructure/factories/usersFactory'
import { tryThisAndHandleAnyError } from '@/api/decorators'
import { AddUserCommand } from '@/application/user/addUserAction'
import { LoginUserCommand } from '@/application/user/loginUserAction'

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

router.post('/login', tryThisAndHandleAnyError(async(req, res) => {
  const command: LoginUserCommand = {
    username: req.body.username,
    password: req.body.password
  }
  const loginUserAction = UsersFactory.getLoginUserAction()
  await loginUserAction.execute(command)
  res.sendStatus(200)
}))

export default router
