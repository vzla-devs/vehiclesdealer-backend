import express from 'express'
import { UsersFactory } from '@/users/infrastructure/usersFactory'
import { tryThisAndHandleAnyError } from '@/shared/infrastructure/controllerDecorators'
import { RegisterUserCommand } from '@/users/application/registerUserAction'
import { LoginUserCommand } from '@/users/application/loginUserAction'

const router = express.Router()

router.post('/register', tryThisAndHandleAnyError(async(req, res) => {
  const command: RegisterUserCommand = {
    username: req.body.username,
    password: req.body.password
  }
  const registerUserAction = UsersFactory.getRegisterUserAction()
  await registerUserAction.execute(command)
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
