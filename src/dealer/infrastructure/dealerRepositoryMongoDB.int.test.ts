import { MongoClient, Db } from 'mongodb'
import { DealerRepositoryMongoDB } from '@/dealer/infrastructure/dealerRepositoryMongoDB'
import { Dealer } from '@/dealer/domain/dealer'
import { getDatabaseConnectionForTests } from '@/shared/infrastructure/persistenceFactory'

describe('dealerRepositoryMongoDB integration tests', () => {
  let connection: MongoClient
  let databaseInstance: Db
  let dealersRepo: DealerRepositoryMongoDB

  beforeAll(async () => {
    connection = await getDatabaseConnectionForTests()
    databaseInstance = connection.db()
    dealersRepo = new DealerRepositoryMongoDB(databaseInstance)
  })

  beforeEach(async () => {
    await databaseInstance.collection('dealers').deleteMany({})
  })

  afterAll(async () => {
    await connection.close()
  })

  it('gets the dealer', async() => {
    const givenName = 'anyDealerName'
    const givenDealerToGet = new Dealer(givenName, ['anyService', 'anyOtherService'])
    await givenAPersistedDealer(givenDealerToGet)
    
    const returnedDealer = await dealersRepo.get()

    expect(returnedDealer).toEqual(givenDealerToGet)
  })

  it('updates the dealer services', async() => {
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
