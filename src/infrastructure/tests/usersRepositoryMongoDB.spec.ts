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
    const givenUserToCreate = new User('anyUsername', 'anyPassword')
    
    await usersRepo.create(givenUserToCreate)
    
    const usersCollection = databaseInstance.collection('users')
    const createdUser = await usersCollection.findOne()
    const expectedUser = { username: 'anyUsername', password: 'anyPassword' }
    verifyUsersAreEqual(createdUser, expectedUser)
  })

  it('gets a user', async() => {
    const givenUsername = 'anyUsername'
    const givenUserToGet = new User(givenUsername, 'anyPassword')
    const usersCollection = databaseInstance.collection('users')
    await usersCollection.insertOne(givenUserToGet.getCredentials())
    
    const returnedUser = await usersRepo.getBy(givenUsername)

    expect(givenUserToGet).toEqual(returnedUser)
  })

  function verifyUsersAreEqual(createdUser: any, expectedUser: any) {
    expect(createdUser.username).toBe(expectedUser.username)
    expect(createdUser.password).toBe(expectedUser.password)
  }
})
