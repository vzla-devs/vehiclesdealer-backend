import { Db, ObjectId } from 'mongodb'
import { MongoDatabaseForTests } from '@/tests/mongoDatabaseForTests'
import { DealerRepositoryMongoDB } from '@/dealer/infrastructure/dealerRepositoryMongoDB'
import { Dealer } from '@/dealer/domain/dealer'
import { Service } from '@/dealer/domain/service'

describe('dealerRepositoryMongoDB integration tests', () => {
  const mongoTests = new MongoDatabaseForTests()
  let databaseInstance: Db
  let dealersRepo: DealerRepositoryMongoDB

  beforeAll(async() => {
    databaseInstance = await mongoTests.createDatabaseConnection()
    dealersRepo = new DealerRepositoryMongoDB(databaseInstance)
  })

  beforeEach(async() => {
    await databaseInstance.collection('services').deleteMany({})
  })

  afterAll(async() => {
    await mongoTests.closeDatabaseConnection()
  })

  it('gets the dealer services', async() => {
    const givenServices: Array<Service> = [
      { id: new ObjectId().toString(), description: 'anyService' },
      { id: new ObjectId().toString(), description: 'anyOtherService' },
    ]
    const givenDealerToGet = new Dealer(givenServices)
    await givenAPersistedDealer(givenDealerToGet)
    
    const returnedDealer = await dealersRepo.get()

    expect(returnedDealer).toEqual(givenDealerToGet)
  })

  it('updates the dealer services', async() => {
    const existingService = { id: new ObjectId().toString(), description: 'secondService' }
    const givenDealer = new Dealer([existingService])
    await givenAPersistedDealer(givenDealer)
    
    const servicesToAdd: Array<Service> = [existingService, { description: 'firstService' }, { description: 'thirdService' }]
    const dealerToUpdate = new Dealer(servicesToAdd)
    await dealersRepo.update(dealerToUpdate)
    
    const updatedDealer = await getPersistedDealer()
    const addedServices = updatedDealer.getServices()
    expect(addedServices).toHaveLength(3)
    expect(addedServices[0]).toEqual(servicesToAdd[0])
    expect(addedServices[1].description).toBe(servicesToAdd[1].description)
    expect(addedServices[2].description).toBe(servicesToAdd[2].description)
  })

  async function givenAPersistedDealer(dealerToPersist: Dealer) {
    const servicesCollection = databaseInstance.collection('services')
    await Promise.all(dealerToPersist.getServices().map(async service => {
      await servicesCollection.insertOne({ _id: new ObjectId(service.id), spanish: service.description })
    }))
  }

  async function getPersistedDealer(): Promise<Dealer> {
    const servicesCollection = databaseInstance.collection('services')
    const persistedServices = await servicesCollection.find({}).toArray()
    const services = persistedServices.map(service => {
      return { id: service._id.toString(), description: service.spanish }
    })
    return new Dealer(services)
  }
})
