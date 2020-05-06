import { MongoClient } from 'mongodb'
import { UsersRepositoryMongoDB } from '@/infrastructure/usersRepositoryMongoDB'
import { User } from '@/domain/models/user'

describe('usersRepositoryMongoDB', () => {
  let connection
  let databaseInstance
  let usersRepo

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    databaseInstance = await connection.db()
    usersRepo = new UsersRepositoryMongoDB(databaseInstance)
  })

  afterAll(async () => {
    await connection.close()
  })

  it('creates a user', async() => {
    const givenUser = new User('anyUsername', 'anyPassword')
    
    await usersRepo.create(givenUser)
    
    const usersCollection = databaseInstance.collection('users')
    const createdUser = await usersCollection.findOne()
    const expectedUser = { username: 'anyUsername', password: 'anyPassword' }
    verifyUsersAreEqual(createdUser, expectedUser)
  })

  function verifyUsersAreEqual(createdUser: any, expectedUser: any) {
    expect(createdUser.username).toBe(expectedUser.username)
    expect(createdUser.password).toBe(expectedUser.password)
  }
})
