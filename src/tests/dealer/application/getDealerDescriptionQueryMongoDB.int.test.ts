import { Db } from 'mongodb'
import { MongoDatabaseForTests } from '@/tests/mongoDatabaseForTests'
import { GetDealerDescriptionQueryMongoDB } from '@/dealer/application/getDealerDescriptionQueryMongoDB'

describe('getDealerDescriptionQueryMongoDB integration tests', () => {
  const mongoTests = new MongoDatabaseForTests()
  let databaseInstance: Db
  let dealerDescriptionQuery: GetDealerDescriptionQueryMongoDB

  beforeAll(async() => {
    databaseInstance = await mongoTests.createDatabaseConnection()
    dealerDescriptionQuery = new GetDealerDescriptionQueryMongoDB(databaseInstance)
  })

  beforeEach(async() => {
    await databaseInstance.collection('abouts').deleteMany({})
  })

  afterAll(async() => {
    await mongoTests.closeDatabaseConnection()
  })

  it('gets the dealer description', async() => {
    const givenDescription = 'anyDescription'
    await givenAPersistedDealerDescription(givenDescription)
    
    const returnedDescription = await dealerDescriptionQuery.execute()
    
    expect(returnedDescription.text).toEqual(givenDescription)
  })

  async function givenAPersistedDealerDescription(description: string): Promise<void> {
    const abouts = databaseInstance.collection('abouts')
    await abouts.insertOne({ text: description })
  }
})
