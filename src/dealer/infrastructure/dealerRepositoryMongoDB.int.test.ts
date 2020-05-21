import { Db } from 'mongodb'
import { MongoDatabaseForTests } from '@/shared/tests/mongoDatabaseForTests'
import { DealerRepositoryMongoDB } from '@/dealer/infrastructure/dealerRepositoryMongoDB'
import { Dealer } from '@/dealer/domain/dealer'

describe('dealerRepositoryMongoDB integration tests', () => {
  const mongoTests = new MongoDatabaseForTests()
  let databaseInstance: Db
  let dealersRepo: DealerRepositoryMongoDB

  beforeAll(async () => {
    databaseInstance = await mongoTests.createDatabaseConnection()
    dealersRepo = new DealerRepositoryMongoDB(databaseInstance)
  })

  beforeEach(async() => {
    await databaseInstance.collection('services').deleteMany({})
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
    
    const updatedDealer = await getPersistedDealer()
    expect(dealerToUpdate).toEqual(updatedDealer)
  })

  async function givenAPersistedDealer(dealerToPersist: Dealer) {
    const servicesCollection = databaseInstance.collection('services')
    await Promise.all(dealerToPersist.getServices().map(async service => {
      await servicesCollection.insertOne({ spanish: service })
    }))
  }

  async function getPersistedDealer(): Promise<Dealer> {
    const servicesCollection = databaseInstance.collection('services')
    const persistedServices = await servicesCollection.find({}).toArray()
    const updatedServices = persistedServices.map(service => { return service.spanish })
    return new Dealer(updatedServices)
  }
})
