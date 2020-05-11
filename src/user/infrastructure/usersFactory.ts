import { getDatabaseConnection } from '@/shared/infrastructure/persistenceFactory'
import { UsersRepositoryMongoDB } from '@/user/infrastructure/usersRepositoryMongoDB'
import { RegisterUserAction } from '@/user/application/registerUserAction'
import { LoginUserAction } from '@/user/application/loginUserAction'

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
