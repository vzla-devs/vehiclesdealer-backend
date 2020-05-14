import { getDatabaseConnection } from '@/shared/infrastructure/persistenceFactory'
import { UsersRepositoryMongoDB } from '@/users/infrastructure/usersRepositoryMongoDB'
import { RegisterUserAction } from '@/users/application/registerUserAction'
import { LoginUserAction } from '@/users/application/loginUserAction'

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
