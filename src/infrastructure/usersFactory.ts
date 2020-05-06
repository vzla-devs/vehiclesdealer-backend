import { getDatabaseConnection } from '@/infrastructure/persistenceFactory'
import { UsersRepositoryMongoDB } from '@/infrastructure/usersRepositoryMongoDB'
import { AddUserAction } from '@/application/user/addUserAction'

export class UsersFactory {
  static getAddUserAction(): AddUserAction
  static getAddUserAction() {
    const databaseInstance = getDatabaseConnection().Db
    const usersRepository = new UsersRepositoryMongoDB(databaseInstance)
    return new AddUserAction(usersRepository)
  }
}
