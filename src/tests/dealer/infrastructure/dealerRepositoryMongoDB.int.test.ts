import { Db, ObjectId } from 'mongodb'
import { MongoDatabaseForTests } from '@/tests/mongoDatabaseForTests'
import { DealerRepositoryMongoDB } from '@/dealer/infrastructure/dealerRepositoryMongoDB'
import { Dealer } from '@/dealer/domain/dealer'
import { Service } from '@/dealer/domain/service'
import { DealerBuilder } from '@/dealer/infrastructure/dealerBuilder'

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
    await databaseInstance.collection('abouts').deleteMany({})
  })

  afterAll(async() => {
    await mongoTests.closeDatabaseConnection()
  })

  describe('when getting the dealer', () => {
    it('gets the dealer services', async() => {
      const givenServices: Array<Service> = [
        { id: new ObjectId().toString(), description: 'anyService' },
        { id: new ObjectId().toString(), description: 'anyOtherService' },
      ]
      const givenDealerToGet = new DealerBuilder().withServices(givenServices).build()
      await givenAPersistedDealer(givenDealerToGet)
      
      const returnedDealer = await dealersRepo.get()
  
      expect(returnedDealer.getServices()).toEqual(givenServices)
    })

    it('gets the dealer description', async() => {
      const givenDescription: string = 'anyDescription'
      const givenDealerToGet = new DealerBuilder().withDescription(givenDescription).build()
      await givenAPersistedDealer(givenDealerToGet)
      
      const returnedDealer = await dealersRepo.get()
  
      expect(returnedDealer.getDescription()).toEqual(givenDescription)
    })
  })

  describe('when updating the dealer', () => {
    it('updates the dealer services', async() => {
      const existingService = { id: new ObjectId().toString(), description: 'secondService' }
      const givenDealer = new DealerBuilder().withServices([existingService]).build()
      await givenAPersistedDealer(givenDealer)
      
      const servicesToAdd: Array<Service> = [existingService, { description: 'firstService' }, { description: 'thirdService' }]
      const dealerToUpdate = new DealerBuilder().withServices(servicesToAdd).build()
      await dealersRepo.update(dealerToUpdate)
      
      const updatedDealer = await getPersistedDealer()
      const addedServices = updatedDealer.getServices()
      expect(addedServices).toHaveLength(3)
      expect(addedServices[0]).toEqual(servicesToAdd[0])
      expect(addedServices[1].description).toBe(servicesToAdd[1].description)
      expect(addedServices[2].description).toBe(servicesToAdd[2].description)
    })
  })

  async function givenAPersistedDealer(dealerToPersist: Dealer) {
    const servicesCollection = databaseInstance.collection('services')
    const aboutsCollection = databaseInstance.collection('abouts')
    await Promise.all(dealerToPersist.getServices().map(async service => {
      await servicesCollection.insertOne({ _id: new ObjectId(service.id), spanish: service.description })
    }))
    await aboutsCollection.insertOne({ text: dealerToPersist.getDescription() })
  }

  async function getPersistedDealer(): Promise<Dealer> {
    const servicesCollection = databaseInstance.collection('services')
    const persistedServices = await servicesCollection.find({}).toArray()
    const services = persistedServices.map(service => {
      return { id: service._id.toString(), description: service.spanish }
    })
    return new DealerBuilder().withServices(services).build()
  }
})
