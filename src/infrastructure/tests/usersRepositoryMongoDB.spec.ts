import { MongoClient, Db } from 'mongodb'
import { UsersRepositoryMongoDB } from '@/infrastructure/usersRepositoryMongoDB'
import { User, NoUser } from '@/domain/models/user'

describe('usersRepositoryMongoDB', () => {
  let connection: MongoClient
  let databaseInstance: Db
  let usersRepo: UsersRepositoryMongoDB

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    databaseInstance = await connection.db()
    usersRepo = new UsersRepositoryMongoDB(databaseInstance)
  })

  beforeEach(async () => {
    await databaseInstance.collection('users').remove({})
  })

  afterAll(async () => {
    await connection.close()
  })

  it('creates a user', async() => {
    const givenUserToCreate = new User('anyUsername', 'anyPassword')
    
    await usersRepo.create(givenUserToCreate)
    
    const usersCollection = databaseInstance.collection('users')
    const createdUser = await usersCollection.findOne({})
    const expectedUser = { username: 'anyUsername', password: 'anyPassword' }
    verifyUsersAreEqual(createdUser, expectedUser)
  })

  it('gets a user', async() => {
    const givenUsername = 'anyUsername'
    const givenUserToGet = new User(givenUsername, 'anyPassword')
    await givenAPersistedUser(givenUserToGet)
    
    const returnedUser = await usersRepo.getBy(givenUsername)

    expect(returnedUser).toEqual(givenUserToGet)
  })

  it('gets an unexistant user', async() => {
    const givenUsername = 'anyUsername'
    const givenAnyOtherUser = new User('anyOtherUsername', 'anyOtherPassword')
    await givenAPersistedUser(givenAnyOtherUser)
    
    const returnedUser = await usersRepo.getBy(givenUsername)

    expect(returnedUser).toBeInstanceOf(NoUser)
  })

  function verifyUsersAreEqual(createdUser: any, expectedUser: any) {
    expect(createdUser.username).toBe(expectedUser.username)
    expect(createdUser.password).toBe(expectedUser.password)
  }

  async function givenAPersistedUser(givenUserToGet: User) {
    const usersCollection = databaseInstance.collection('users')
    await usersCollection.insertOne(givenUserToGet.getCredentials())
  }
})
