import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { User } from '@/domain/models/user'

class UsersRepositoryMongoDB implements UsersRepository {
  database: any
  
  async create(userToCreate: User) {
    const users = this.database.collection('users')
    const userData = userToCreate.getCredentials()
    await users.insertOne(userData)
  }

  constructor(databaseInstance: any) {
    this.database = databaseInstance
  }
}

export { UsersRepositoryMongoDB }
