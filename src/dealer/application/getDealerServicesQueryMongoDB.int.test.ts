import { Db, ObjectId } from 'mongodb'
import { MongoDatabaseForTests } from '@/shared/tests/mongoDatabaseForTests'
import { GetDealerServicesQueryMongoDB } from '@/dealer/application/getDealerServicesQueryMongoDB'
import { DealerServiceDto } from '@/dealer/application/dealerServiceDto'

describe('getDealerServicesQueryMongoDB integration tests', () => {
  const mongoTests = new MongoDatabaseForTests()
  let databaseInstance: Db
  let dealerServicesQuery: GetDealerServicesQueryMongoDB

  beforeAll(async () => {
    databaseInstance = await mongoTests.createDatabaseConnection()
    dealerServicesQuery = new GetDealerServicesQueryMongoDB(databaseInstance)
  })

  beforeEach(async() => {
    await databaseInstance.collection('services').deleteMany({})
  })

  afterAll(async () => {
    await mongoTests.closeDatabaseConnection()
  })

  it('gets all the dealer services', async() => {
    const firstServiceId = new ObjectId()
    const secondServiceId = new ObjectId()
    const thirdServiceId = new ObjectId()
    const givenDealerToGet = {
      services: [
        { _id: firstServiceId, spanish: 'firstService' },
        { _id: secondServiceId, spanish: 'secondService' },
        { _id: thirdServiceId, spanish: 'thirdService' }
      ]
    }
    await givenAPersistedDealer(givenDealerToGet)
    
    const returnedServices = await dealerServicesQuery.getAll()
    
    const expectedServices: Array<DealerServiceDto> = [
      { _id: firstServiceId, spanish: 'firstService' },
      { _id: secondServiceId, spanish: 'secondService' },
      { _id: thirdServiceId, spanish: 'thirdService' }
    ]
    expect(returnedServices).toEqual(expectedServices)
  })

  async function givenAPersistedDealer(dealerToPersist: { services: Array<{ _id: ObjectId, spanish: string }> }) {
    const servicesCollection = databaseInstance.collection('services')
    await servicesCollection.insertOne({ _id: dealerToPersist.services[0]._id, spanish: dealerToPersist.services[0].spanish })
    await servicesCollection.insertOne({ _id: dealerToPersist.services[1]._id, spanish: dealerToPersist.services[1].spanish })
    await servicesCollection.insertOne({ _id: dealerToPersist.services[2]._id, spanish: dealerToPersist.services[2].spanish })
    // dealerToPersist.services.forEach(async service => {
    //   try {
    //     await servicesCollection.insertOne({ spanish: service.spanish })
    //   } catch(err) {
    //     console.log('error ', err)
    //   }
    // })
  }
})
