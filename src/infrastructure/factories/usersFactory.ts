import { getDatabaseConnection } from '@/infrastructure/factories/persistenceFactory'
import { UsersRepositoryMongoDB } from '@/infrastructure/repositories/usersRepositoryMongoDB'
import { AddUserAction } from '@/application/user/addUserAction'
import { LoginUserAction } from '@/application/user/loginUserAction'

export class UsersFactory {
  static getAddUserAction(): AddUserAction {
    const databaseInstance = getDatabaseConnection().db
    const usersRepository = new UsersRepositoryMongoDB(databaseInstance)
    return new AddUserAction(usersRepository)
  }

  static getLoginUserAction(): LoginUserAction {
    const databaseInstance = getDatabaseConnection().db
    const usersRepository = new UsersRepositoryMongoDB(databaseInstance)
    return new LoginUserAction(usersRepository)
  }
}
