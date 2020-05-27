import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { Dealer } from '@/dealer/domain/dealer'
import { Db } from 'mongodb'
import { Service } from '@/dealer/domain/service'
import { ADealerBuilder } from '@/dealer/infrastructure/dealerBuilder'
import { MongoDBCollection } from '@/shared/infrastructure/constants/mongoDBCollections'

export class DealerRepositoryMongoDB implements DealerRepository {
  private databaseInstance: Db

  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async get() {
    const services = await this.getDealerServices()
    const description = await this.getDealerDescription()
    return new ADealerBuilder().withServices(services).withDescription(description).build()
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
