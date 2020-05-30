import { Db, ObjectId } from 'mongodb'
import { MongoDatabaseForTests } from '@/tests/mongoDatabaseForTests'
import { DealerRepositoryMongoDB } from '@/dealer/infrastructure/dealerRepositoryMongoDB'
import { Dealer } from '@/dealer/domain/dealer'
import { Service } from '@/dealer/domain/service'
import { ADealerBuilder } from '@/dealer/infrastructure/dealerBuilder'
import { MongoDBCollection } from '@/shared/infrastructure/constants/mongoDBCollections'
import { ContactInformation, NoContactInformation } from '@/dealer/domain/contactInformation'

describe('dealerRepositoryMongoDB integration tests', () => {
  const mongoTests = new MongoDatabaseForTests()
  let databaseInstance: Db
  let dealersRepo: DealerRepositoryMongoDB

  beforeAll(async() => {
    databaseInstance = await mongoTests.createDatabaseConnection()
    dealersRepo = new DealerRepositoryMongoDB(databaseInstance)
  })

  beforeEach(async() => {
    await databaseInstance.collection(MongoDBCollection.services).deleteMany({})
    await databaseInstance.collection(MongoDBCollection.description).deleteMany({})
    await databaseInstance.collection(MongoDBCollection.contact).deleteMany({})
  })

  afterAll(async() => {
    await mongoTests.closeDatabaseConnection()
  })

  describe('when getting the dealer', () => {
    it('gets the services', async() => {
      const givenServices: Array<Service> = [
        { id: new ObjectId().toString(), description: 'anyService' },
        { id: new ObjectId().toString(), description: 'anyOtherService' },
      ]
      const givenDealerToGet = new ADealerBuilder().withServices(givenServices).build()
      await givenAPersistedDealer(givenDealerToGet)
      
      const returnedDealer = await dealersRepo.get()
  
      expect(returnedDealer.getServices()).toEqual(givenServices)
    })

    it('gets the description', async() => {
      const givenDescription: string = 'anyDescription'
      const givenDealerToGet = new ADealerBuilder().withDescription(givenDescription).build()
      await givenAPersistedDealer(givenDealerToGet)
      
      const returnedDealer = await dealersRepo.get()
  
      expect(returnedDealer.getDescription()).toBe(givenDescription)
    })

    it('gets the contact information', async() => {
      const givenContactInformation: ContactInformation = {
        phoneNumbers: { main: 987654321, mobile: 123456789 },
        emails: ['firstEmail@whatever.com', 'secondEmail@whatever.com'],
        weekdaysInformation: {
          monday: 'anyMonday',
          tuesday: 'anyTuesday',
          wednesday: 'anyWednesday',
          thursday: 'anyThursday',
          friday: 'anyFriday',
          saturday: 'anySaturday',
        }
      }
      const givenDealerToGet = new ADealerBuilder().withContactInformation(givenContactInformation).build()
      await givenAPersistedDealer(givenDealerToGet)

      const returnedDealer = await dealersRepo.get()
  
      expect(returnedDealer.getContactInformation()).toEqual(givenContactInformation)
    })

    it('gets no contact information when it is not persisted', async() => {
      const givenDealerToGet = new ADealerBuilder().build()
      await givenAPersistedDealer(givenDealerToGet)

      const returnedDealer = await dealersRepo.get()
  
      const expectedContactInformation = new NoContactInformation()
      expect(returnedDealer.getContactInformation()).toEqual(expectedContactInformation)
    })
  })

  describe('when updating the dealer', () => {
    it('updates the services', async() => {
      const existingService = { id: new ObjectId().toString(), description: 'secondService' }
      const givenDealer = new ADealerBuilder().withServices([existingService]).build()
      await givenAPersistedDealer(givenDealer)
      
      const servicesToAdd: Array<Service> = [existingService, { description: 'firstService' }, { description: 'thirdService' }]
      const dealerToUpdate = new ADealerBuilder().withServices(servicesToAdd).build()
      await dealersRepo.update(dealerToUpdate)
      
      const updatedDealer = await getPersistedDealer()
      const addedServices = updatedDealer.getServices()
      expect(addedServices).toHaveLength(3)
      expect(addedServices[0]).toEqual(servicesToAdd[0])
      expect(addedServices[1].description).toBe(servicesToAdd[1].description)
      expect(addedServices[2].description).toBe(servicesToAdd[2].description)
    })

    it('updates the description', async() => {
      const existingDescription = 'anyExistingDescription'
      const givenDealer = new ADealerBuilder().withDescription(existingDescription).build()
      await givenAPersistedDealer(givenDealer)
      
      const newDescription = 'anyNewDescription'
      const dealerToUpdate = new ADealerBuilder().withDescription(newDescription).build()
      await dealersRepo.update(dealerToUpdate)
      
      const updatedDealer = await getPersistedDealer()
      expect(updatedDealer.getDescription()).toBe(newDescription)
    })

    it('updates the contact information', async() => {
      const existingContactInformation: ContactInformation = {
        phoneNumbers: { main: 987654321, mobile: 123456789 },
        emails: ['firstEmail@whatever.com', 'secondEmail@whatever.com'],
        weekdaysInformation: {
          monday: 'anyMonday',
          tuesday: 'anyTuesday',
          wednesday: 'anyWednesday',
          thursday: 'anyThursday',
          friday: 'anyFriday',
          saturday: 'anySaturday',
        }
      }
      const givenDealer = new ADealerBuilder().withContactInformation(existingContactInformation).build()
      await givenAPersistedDealer(givenDealer)
      
      const newContactInformation: ContactInformation = {
        phoneNumbers: { main: 234567891, mobile: 565647382 },
        emails: ['newFirstEmail@whatever.com', 'newSecondEmail@whatever.com'],
        weekdaysInformation: {
          monday: 'newMondayInformation',
          tuesday: 'newTuesdayInformation',
          wednesday: 'newWednesdayInformation',
          thursday: 'newThursdayInformation',
          friday: 'newFridayInformation',
          saturday: 'newSaturdayInformation',
        }
      }
      const dealerToUpdate = new ADealerBuilder().withContactInformation(newContactInformation).build()
      await dealersRepo.update(dealerToUpdate)
      
      const updatedDealer = await getPersistedDealer()
      expect(updatedDealer.getContactInformation()).toEqual(newContactInformation)
    })
  })

  async function givenAPersistedDealer(dealerToPersist: Dealer) {
    const servicesCollection = databaseInstance.collection(MongoDBCollection.services)
    await Promise.all(dealerToPersist.getServices().map(async service => {
      await servicesCollection.insertOne({ _id: new ObjectId(service.id), spanish: service.description })
    }))
    const descriptionCollection = databaseInstance.collection(MongoDBCollection.description)
    await descriptionCollection.insertOne({ text: dealerToPersist.getDescription() })
    const contactInformationExists = !(dealerToPersist.getContactInformation() instanceof NoContactInformation)
    if (contactInformationExists) {
      const contactCollection = databaseInstance.collection(MongoDBCollection.contact)
      const contactInformationToPersist = dealerToPersist.getContactInformation()
      await contactCollection.insertOne({
        mainPhone: contactInformationToPersist.phoneNumbers.main,
        mobilePhone: contactInformationToPersist.phoneNumbers.mobile,
        emails: contactInformationToPersist.emails,
        monday: contactInformationToPersist.weekdaysInformation.monday,
        tuesday: contactInformationToPersist.weekdaysInformation.tuesday,
        wednesday: contactInformationToPersist.weekdaysInformation.wednesday,
        thursday: contactInformationToPersist.weekdaysInformation.thursday,
        friday: contactInformationToPersist.weekdaysInformation.friday,
        saturday: contactInformationToPersist.weekdaysInformation.saturday
      })
    }
  }

  async function getPersistedDealer(): Promise<Dealer> {
    const servicesCollection = databaseInstance.collection(MongoDBCollection.services)
    const persistedServices = await servicesCollection.find({}).toArray()
    const services = persistedServices.map(service => {
      return { id: service._id.toString(), description: service.spanish }
    })
    const descriptionCollection = databaseInstance.collection(MongoDBCollection.description)
    const persistedDescription = await descriptionCollection.findOne({})
    const description = persistedDescription.text
    const contactCollection = databaseInstance.collection(MongoDBCollection.contact)
    const persistedContactInformation = await contactCollection.findOne({})
    const contactInformationExists = persistedContactInformation !== null
    let contactInformation: ContactInformation = new NoContactInformation()
    if (contactInformationExists) {
      contactInformation = {
        phoneNumbers: {
          main: persistedContactInformation.mainPhone,
          mobile: persistedContactInformation.mobilePhone
        },
        emails: persistedContactInformation.emails,
        weekdaysInformation: {
          monday: persistedContactInformation.monday,
          tuesday: persistedContactInformation.tuesday,
          wednesday: persistedContactInformation.wednesday,
          thursday: persistedContactInformation.thursday,
          friday: persistedContactInformation.friday,
          saturday: persistedContactInformation.saturday
        }
      }
    }
    return new ADealerBuilder()
      .withServices(services)
      .withDescription(description)
      .withContactInformation(contactInformation)
      .build()
  }
})
