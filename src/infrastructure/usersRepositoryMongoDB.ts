import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { User, NoUser } from '@/domain/models/user'
import { Db } from 'mongodb'

class UsersRepositoryMongoDB implements UsersRepository {
  database: Db

  async create(userToCreate: User) {
    const usersCollection = this.database.collection('users')
    const userData = userToCreate.getCredentials()
    await usersCollection.insertOne(userData)
  }

  async getBy(username: string) {
    const usersCollection = this.database.collection('users')
    const returnedUser = await usersCollection.findOne({ username })
    if (!returnedUser) return new NoUser()
    return new User(returnedUser.username, returnedUser.password)
  }

  constructor(databaseInstance: Db) {
    this.database = databaseInstance
  }
}

export { UsersRepositoryMongoDB }
