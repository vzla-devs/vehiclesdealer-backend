import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { Dealer } from '@/dealer/domain/dealer'
import { Db } from 'mongodb'
import { Service } from '@/dealer/domain/service'
import { DealerBuilder } from '@/dealer/infrastructure/dealerBuilder'
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
    return new DealerBuilder()
      .withServices(services)
      .withDescription(description)
      .withContactInformation(contactInformation)
      .build()
  }

  async update(dealerToUpdate: Dealer) {
    await this.updateDealerServices(dealerToUpdate)
    await this.updateDealerDescription(dealerToUpdate)
    await this.updateDealerContactInformation(dealerToUpdate)
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
    let contactInformation: ContactInformation = new NoContactInformation()
    const contactInformationExists = persistedContactInformation !== null
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
    return contactInformation
  }

  private async updateDealerServices(dealer: Dealer): Promise<void> {
    const servicesCollection = this.databaseInstance.collection(MongoDBCollection.services)
    const newServices = this.getServicesThatAreYetToBeCreated(dealer.getServices())
    await Promise.all(newServices.map(async service => {
      await servicesCollection.insertOne({ spanish: service.description })
    }))
  }

  private getServicesThatAreYetToBeCreated(services: Array<Service>): Array<Service> {
    return services.filter(service => !service.id)
  }

  private async updateDealerDescription(dealer: Dealer): Promise<void> {
    const descriptionCollection = this.databaseInstance.collection(MongoDBCollection.description)
    await descriptionCollection.updateOne({}, { $set: { text: dealer.getDescription() } })
  }

  private async updateDealerContactInformation(dealer: Dealer): Promise<void> {
    const contactCollection = this.databaseInstance.collection(MongoDBCollection.contact)
    const newContactInformation = dealer.getContactInformation()
    const contactInformationExists = !(newContactInformation instanceof NoContactInformation)
    if (contactInformationExists) {
      await contactCollection.updateOne({}, {
        $set: {
          mainPhone: newContactInformation.phoneNumbers.main,
          mobilePhone: newContactInformation.phoneNumbers.mobile,
          emails: newContactInformation.emails,
          monday: newContactInformation.weekdaysInformation.monday,
          tuesday: newContactInformation.weekdaysInformation.tuesday,
          wednesday: newContactInformation.weekdaysInformation.wednesday,
          thursday: newContactInformation.weekdaysInformation.thursday,
          friday: newContactInformation.weekdaysInformation.friday,
          saturday: newContactInformation.weekdaysInformation.saturday,
        }
      }, { upsert: true })
    }
  }
}
