import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { User } from '@/domain/models/user'

class UsersRepositoryMongoDB implements UsersRepository {
  database: any

  async create(userToCreate: User) {
    const usersCollection = this.database.collection('users')
    const userData = userToCreate.getCredentials()
    await usersCollection.insertOne(userData)
  }

  async getBy(username: string) {
    const usersCollection = this.database.collection('users')
    const returnedUserFromPersistence = await usersCollection.findOne({ username })
    const user = new User(returnedUserFromPersistence.username, returnedUserFromPersistence.password)
    return user
  }

  constructor(databaseInstance: any) {
    this.database = databaseInstance
  }
}

export { UsersRepositoryMongoDB }
