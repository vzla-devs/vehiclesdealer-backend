import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { Dealer } from '@/dealer/domain/dealer'
import { Db } from 'mongodb'
import { Service } from '@/dealer/domain/service'
import { ADealerBuilder } from '@/dealer/infrastructure/dealerBuilder'
import { MongoDBCollection } from '@/shared/infrastructure/constants/mongoDBCollections'
import { ContactInformation, NoContactInformation } from '@/dealer/domain/contactInformation'

export class DealerRepositoryMongoDB implements DealerRepository {
  private databaseInstance: Db

  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async get() {
    const services = await this.getDealerServices()
    const description = await this.getDealerDescription()
    const contactInformation = await this.getContactInformation()
    return new ADealerBuilder()
      .withServices(services)
      .withDescription(description)
      .withContactInformation(contactInformation)
      .build()
  }

  private async getDealerServices(): Promise<Array<Service>> {
    const servicesCollection = this.databaseInstance.collection(MongoDBCollection.services)
    const persistedServices = await servicesCollection.find({}).toArray()
    const services = persistedServices.map(service => {
      return { id: service._id.toString(), description: service.spanish }
    })
    return services
  }

  private async getDealerDescription(): Promise<string> {
    const descriptionCollection = this.databaseInstance.collection(MongoDBCollection.description)
    const persistedDescription = await descriptionCollection.findOne({})
    return persistedDescription.text
  }

  private async getContactInformation(): Promise<ContactInformation> {
    const contactCollection = this.databaseInstance.collection(MongoDBCollection.contact)
    const persistedContactInformation = await contactCollection.findOne({})
    if (!persistedContactInformation) {
      return new NoContactInformation()
    } else {
      const contactInformation: ContactInformation = {
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
      return contactInformation
    }
  }

  async update(dealerToUpdate: Dealer) {
    await this.updateDealerServices(dealerToUpdate)
    await this.updateDealerDescription(dealerToUpdate)
  }

  private async updateDealerServices(dealer: Dealer): Promise<void> {
    const servicesCollection = this.databaseInstance.collection(MongoDBCollection.services)
    const newServices = dealer.getServices().filter(service => !service.id)
    await Promise.all(newServices.map(async service => {
      await servicesCollection.insertOne({ spanish: service.description })
    }))
  }

  private async updateDealerDescription(dealer: Dealer): Promise<void> {
    const descriptionCollection = this.databaseInstance.collection(MongoDBCollection.description)
    await descriptionCollection.updateOne({}, { $set: { text: dealer.getDescription() } })
  }
}
