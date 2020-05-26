import { UsersRepository } from '@/users/domain/usersRepository'
import { User, NoUser } from '@/users/domain/user'
import { Db } from 'mongodb'

class UsersRepositoryMongoDB implements UsersRepository {
  private databaseInstance: Db

  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

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
}

export { UsersRepositoryMongoDB }
