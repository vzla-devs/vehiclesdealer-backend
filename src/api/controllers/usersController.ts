import express from 'express'
import { UsersFactory } from '@/users/infrastructure/usersFactory'
import { decorateControllerToCatchAnyError } from '@/api/controllers/controllerDecorators'
import { RegisterUserCommand } from '@/users/application/registerUserAction'
import { LoginUserCommand } from '@/users/application/loginUserAction'

const router = express.Router()

//TODO: create a unit test for this endpoint
router.post('/register', decorateControllerToCatchAnyError(async(req, res) => {
  const command: RegisterUserCommand = {
    username: req.body.username,
    password: req.body.password
  }
  const registerUserAction = UsersFactory.getRegisterUserAction()
  await registerUserAction.execute(command)
  res.sendStatus(201)
}))

//TODO: create a unit test for this endpoint
router.post('/login', decorateControllerToCatchAnyError(async(req, res) => {
  const command: LoginUserCommand = {
    username: req.body.username,
    password: req.body.password
  }
  const loginUserAction = UsersFactory.getLoginUserAction()
  await loginUserAction.execute(command)
  res.sendStatus(200)
}))

export default router
