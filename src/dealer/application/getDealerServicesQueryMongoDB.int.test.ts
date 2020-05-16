import { Db } from 'mongodb'
import { MongoDatabaseForTests } from '@/shared/tests/mongoDatabaseForTests'
import { GetDealerServicesQueryMongoDB } from '@/dealer/application/getDealerServicesQueryMongoDB'
import { DealerServiceDto } from '@/dealer/application/dealerServiceDto'

describe('getDealerServicesQueryMongoDB integration tests', () => {
  const mongoTests = new MongoDatabaseForTests(['dealers'])
  let databaseInstance: Db
  let dealerServicesQuery: GetDealerServicesQueryMongoDB

  beforeAll(async () => {
    databaseInstance = await mongoTests.createDatabaseConnection()
    dealerServicesQuery = new GetDealerServicesQueryMongoDB(databaseInstance)
  })

  beforeEach(async () => {
    await mongoTests.cleanDatabaseCollections()
  })

  afterAll(async () => {
    await mongoTests.closeDatabaseConnection()
  })

  it('gets all the dealer services', async() => {
    const givenDealerToGet = { services: ['firstService', 'secondService', 'thirdService'] }
    await givenAPersistedDealer(givenDealerToGet)
    
    const returnedServices = await dealerServicesQuery.getAll()

    const expectedServices: Array<DealerServiceDto> = [
      { spanish: 'firstService' },
      { spanish: 'secondService' },
      { spanish: 'thirdService' }
    ]
    expect(returnedServices).toEqual(expectedServices)
  })

  async function givenAPersistedDealer(dealerToPersist: { services: Array<string> }) {
    const dealersCollection = databaseInstance.collection('dealers')
    await dealersCollection.insertOne({ services: dealerToPersist.services })
  }
})
