import { MongoClient } from 'mongodb'
import { UsersRepositoryMongoDB } from '@/infrastructure/usersRepositoryMongoDB'
import { User } from '@/domain/models/user'

describe('usersRepositoryMongoDB', () => {
  let connection
  let db
  const usersRepo = new UsersRepositoryMongoDB()

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('creates a user', async() => {
    const users = db.collection('users')
    const givenUser = new User('anyUsername', 'anyPassword')

    usersRepo.create(givenUser)

    const createdUser = await users.findOne()
    const expectedUser = { username: 'anyUsername', password: 'anyPassword' }
    expect(createdUser.username).toBe(expectedUser.username)
    expect(createdUser.password).toBe(expectedUser.password)
  })
})
