import { getDatabaseConnection } from '@/infrastructure/factories/persistenceFactory'
import { UsersRepositoryMongoDB } from '@/infrastructure/repositories/usersRepositoryMongoDB'
import { AddUserAction } from '@/application/user/addUserAction'

export class UsersFactory {
  static getAddUserAction(): AddUserAction
  static getAddUserAction() {
    const databaseInstance = getDatabaseConnection().db
    const usersRepository = new UsersRepositoryMongoDB(databaseInstance)
    return new AddUserAction(usersRepository)
  }
}
