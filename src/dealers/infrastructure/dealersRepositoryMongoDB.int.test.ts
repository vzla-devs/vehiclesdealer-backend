import { MongoClient, Db } from 'mongodb'
import { DealersRepositoryMongoDB } from '@/dealers/infrastructure/dealersRepositoryMongoDB'
import { User, NoUser } from '@/user/domain/user'
import { Dealer } from '../domain/dealerModel'

describe('dealersRepositoryMongoDB integration tests', () => {
  let connection: MongoClient
  let databaseInstance: Db
  let dealersRepo: DealersRepositoryMongoDB

  beforeAll(async () => {
    const uri = process.env.MONGO_URL ? process.env.MONGO_URL : ''
    connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    databaseInstance = connection.db()
    dealersRepo = new DealersRepositoryMongoDB(databaseInstance)
  })

  beforeEach(async () => {
    await databaseInstance.collection('dealers').deleteMany({})
  })

  afterAll(async () => {
    await connection.close()
  })

  it('gets a dealer', async() => {
    const givenName = 'anyDealerName'
    const givenDealerToGet = new Dealer(givenName)
    await givenAPersistedDealer(givenDealerToGet)
    
    const returnedUser = await dealersRepo.get()

    expect(returnedUser).toEqual(givenDealerToGet)
  })

  async function givenAPersistedDealer(givenDealerToGet: Dealer) {
    const dealersCollection = databaseInstance.collection('dealers')
    const dealerToPersist = { name: givenDealerToGet.getName() }
    await dealersCollection.insertOne(dealerToPersist)
  }
})
