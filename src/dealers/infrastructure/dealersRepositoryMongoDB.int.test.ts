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
    const givenDealerToGet = new Dealer(givenName, ['anyService', 'anyOtherService'])
    await givenAPersistedDealer(givenDealerToGet)
    
    const returnedDealer = await dealersRepo.get()

    expect(returnedDealer).toEqual(givenDealerToGet)
  })

  it('updates a dealer services', async() => {
    const givenDealerName = 'anyDealerName'
    const givenDealer = new Dealer(givenDealerName, [])
    await givenAPersistedDealer(givenDealer)
    
    const dealerToUpdate = new Dealer(givenDealerName, ['firstService', 'secondService', 'thirdService'])
    await dealersRepo.update(dealerToUpdate)
    
    const dealersCollection = databaseInstance.collection('dealers')
    const updatedDealer = await dealersCollection.findOne({})
    verifyDealersAreEqual(dealerToUpdate, updatedDealer)
  })

  async function givenAPersistedDealer(dealerToPersist: Dealer) {
    const dealersCollection = databaseInstance.collection('dealers')
    await dealersCollection.insertOne({ name: dealerToPersist.getName(), services: dealerToPersist.getServices() })
  }

  function verifyDealersAreEqual(expectedDealer: Dealer, persistedDealerToVerify: any) {
    expect(expectedDealer.getName()).toBe(persistedDealerToVerify.name)
    expect(expectedDealer.getServices()).toEqual(persistedDealerToVerify.services)
  }
})
