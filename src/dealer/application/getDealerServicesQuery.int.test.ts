import { Db } from 'mongodb'
import { MongoDatabaseForTests } from '@/shared/tests/mongoDatabaseForTests'
import { GetDealerServicesQuery } from '@/dealer/application/getDealerServicesQuery'
import { DealerServiceDto } from './dealerServiceDto'

describe('getDealerServicesQuery integration tests', () => {
  const mongoTests = new MongoDatabaseForTests(['dealers'])
  let databaseInstance: Db
  let dealerServicesQuery: GetDealerServicesQuery

  beforeAll(async () => {
    databaseInstance = await mongoTests.createDatabaseConnection()
    dealerServicesQuery = new GetDealerServicesQuery(databaseInstance)
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
