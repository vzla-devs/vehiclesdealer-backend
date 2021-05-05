import { Db } from 'mongodb'
import { MongoDatabaseForTests } from '@/shared/testHelpers/mongoDatabaseForTests'
import { GetDealerContactInformationQueryMongoDB, DealerContactInformationDto } from '@/dealer/application/queries/getDealerContactInformationQueryMongoDB'
import { MongoDBCollection } from '@/shared/infrastructure/constants/mongoDBCollections'

describe('getDealerContactInformationQueryMongoDB integration tests', () => {
  const mongoTests = new MongoDatabaseForTests()
  let databaseInstance: Db
  let dealerContactInformationQuery: GetDealerContactInformationQueryMongoDB

  beforeAll(async() => {
    databaseInstance = await mongoTests.createDatabaseConnection()
    dealerContactInformationQuery = new GetDealerContactInformationQueryMongoDB(databaseInstance)
  })

  beforeEach(async() => {
    await databaseInstance.collection(MongoDBCollection.contact).deleteMany({})
  })

  afterAll(async() => {
    await mongoTests.closeDatabaseConnection()
  })

  it('gets the dealer contact information', async() => {
    const givenContactInformation = {
      emails: ['first@email.com', 'second@email.com'],
      mainPhone: 3491023,
      mobilePhone: 2284621,
      monday: 'anyMonday',
      tuesday: 'anyTuesday',
      wednesday: 'anyWednesday',
      thursday: 'anyThursday',
      friday: 'anyFriday',
      saturday: 'anySaturday'
    }
    await givenAPersistedDealerContactInformation(givenContactInformation)
    
    const returnedDescription: DealerContactInformationDto = await dealerContactInformationQuery.execute()
    
    const expectedContactInformation: DealerContactInformationDto = {
      emails: ['first@email.com', 'second@email.com'],
      mainPhone: 3491023,
      mobilePhone: 2284621,
      monday: 'anyMonday',
      tuesday: 'anyTuesday',
      wednesday: 'anyWednesday',
      thursday: 'anyThursday',
      friday: 'anyFriday',
      saturday: 'anySaturday'
    }
    expect(returnedDescription).toEqual(expectedContactInformation)
  })

  async function givenAPersistedDealerContactInformation(contactInformation: DealerContactInformationDto): Promise<void> {
    const abouts = databaseInstance.collection(MongoDBCollection.contact)
    await abouts.insertOne({
      emails: contactInformation.emails,
      mainPhone: contactInformation.mainPhone,
      mobilePhone: contactInformation.mobilePhone,
      monday: contactInformation.monday,
      tuesday: contactInformation.tuesday,
      wednesday: contactInformation.wednesday,
      thursday: contactInformation.thursday,
      friday: contactInformation.friday,
      saturday: contactInformation.saturday
    })
  }
})
