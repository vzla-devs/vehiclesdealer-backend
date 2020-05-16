import { Db } from 'mongodb'
import { MongoDBTest } from '@/shared/tests/mongoDBTest'
import { DealerRepositoryMongoDB } from '@/dealer/infrastructure/dealerRepositoryMongoDB'
import { Dealer } from '@/dealer/domain/dealer'

describe('dealerRepositoryMongoDB integration tests', () => {
  const mongoTests = new MongoDBTest(['dealers'])
  let databaseInstance: Db
  let dealersRepo: DealerRepositoryMongoDB

  beforeAll(async () => {
    databaseInstance = await mongoTests.createDatabaseInstance()
    dealersRepo = new DealerRepositoryMongoDB(databaseInstance)
  })

  beforeEach(async () => {
    await mongoTests.cleanCollections()
  })

  afterAll(async () => {
    await mongoTests.closeDatabaseConnection()
  })

  it('gets the dealer', async() => {
    const givenDealerToGet = new Dealer(['anyService', 'anyOtherService'])
    await givenAPersistedDealer(givenDealerToGet)
    
    const returnedDealer = await dealersRepo.get()

    expect(returnedDealer).toEqual(givenDealerToGet)
  })

  it('updates the dealer services', async() => {
    const givenDealer = new Dealer([])
    await givenAPersistedDealer(givenDealer)
    
    const dealerToUpdate = new Dealer(['firstService', 'secondService', 'thirdService'])
    await dealersRepo.update(dealerToUpdate)
    
    const dealersCollection = databaseInstance.collection('dealers')
    const updatedDealer = await dealersCollection.findOne({})
    verifyDealersAreEqual(dealerToUpdate, updatedDealer)
  })

  async function givenAPersistedDealer(dealerToPersist: Dealer) {
    const dealersCollection = databaseInstance.collection('dealers')
    await dealersCollection.insertOne({ services: dealerToPersist.getServices() })
  }

  function verifyDealersAreEqual(expectedDealer: Dealer, persistedDealerToVerify: any) {
    expect(expectedDealer.getServices()).toEqual(persistedDealerToVerify.services)
  }
})
