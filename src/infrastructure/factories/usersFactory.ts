import { getDatabaseConnection } from '@/infrastructure/factories/persistenceFactory'
import { UsersRepositoryMongoDB } from '@/infrastructure/repositories/usersRepositoryMongoDB'
import { RegisterUserAction } from '@/application/user/registerUserAction'
import { LoginUserAction } from '@/application/user/loginUserAction'

export class UsersFactory {
  static getRegisterUserAction(): RegisterUserAction {
    const databaseInstance = getDatabaseConnection().db
    const usersRepository = new UsersRepositoryMongoDB(databaseInstance)
    return new RegisterUserAction(usersRepository)
  }

  static getLoginUserAction(): LoginUserAction {
    const databaseInstance = getDatabaseConnection().db
    const usersRepository = new UsersRepositoryMongoDB(databaseInstance)
    return new LoginUserAction(usersRepository)
  }
}
