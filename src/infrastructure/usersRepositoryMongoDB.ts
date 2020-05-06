import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { User, NoUser } from '@/domain/models/user'
import { Db } from 'mongodb'

class UsersRepositoryMongoDB implements UsersRepository {
  databaseInstance: Db

  async create(userToCreate: User) {
    const usersCollection = this.databaseInstance.collection('users')
    const userData = userToCreate.getCredentials()
    await usersCollection.insertOne(userData)
  }

  async getBy(username: string) {
    const usersCollection = this.databaseInstance.collection('users')
    const returnedUser = await usersCollection.findOne({ username })
    if (!returnedUser) return new NoUser()
    return new User(returnedUser.username, returnedUser.password)
  }

  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }
}

export { UsersRepositoryMongoDB }
