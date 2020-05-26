import { Db, ObjectId } from 'mongodb'
import { MongoDatabaseForTests } from '@/tests/mongoDatabaseForTests'
import { GetDealerServicesQueryMongoDB } from '@/dealer/application/getDealerServicesQueryMongoDB'
import { DealerServiceDto } from '@/dealer/application/dtos/dealerServiceDto'

describe('getDealerServicesQueryMongoDB integration tests', () => {
  const mongoTests = new MongoDatabaseForTests()
  let databaseInstance: Db
  let dealerServicesQuery: GetDealerServicesQueryMongoDB

  beforeAll(async() => {
    databaseInstance = await mongoTests.createDatabaseConnection()
    dealerServicesQuery = new GetDealerServicesQueryMongoDB(databaseInstance)
  })

  beforeEach(async() => {
    await databaseInstance.collection('services').deleteMany({})
  })

  afterAll(async() => {
    await mongoTests.closeDatabaseConnection()
  })

  it('gets all the dealer services', async() => {
    const firstServiceId = new ObjectId()
    const secondServiceId = new ObjectId()
    const thirdServiceId = new ObjectId()
    const givenDealerServicesToGet = [
      { _id: firstServiceId, spanish: 'firstService' },
      { _id: secondServiceId, spanish: 'secondService' },
      { _id: thirdServiceId, spanish: 'thirdService' }
    ]
    await givenPersistedDealerServices(givenDealerServicesToGet)
    
    const returnedServices = await dealerServicesQuery.execute()
    
    const expectedServices: Array<DealerServiceDto> = [
      { _id: firstServiceId, spanish: 'firstService' },
      { _id: secondServiceId, spanish: 'secondService' },
      { _id: thirdServiceId, spanish: 'thirdService' }
    ]
    expect(returnedServices).toEqual(expectedServices)
  })

  async function givenPersistedDealerServices(services: Array<{ _id: ObjectId, spanish: string }>) {
    const servicesCollection = databaseInstance.collection('services')
    await Promise.all(services.map(async service => {
        await servicesCollection.insertOne({ _id: service._id, spanish: service.spanish })
      })
    )
  }
})
