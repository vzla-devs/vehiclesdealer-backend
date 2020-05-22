import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { Dealer } from '@/dealer/domain/dealer'
import { Db } from 'mongodb'
import { Service } from '@/dealer/domain/service'

export class DealerRepositoryMongoDB implements DealerRepository {
  private databaseInstance: Db

  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async get() {
    const services = await this.getDealerServices()
    return new Dealer(services)
  }

  private async getDealerServices(): Promise<Array<Service>> {
    const servicesCollection = this.databaseInstance.collection('services')
    const persistedServices = await servicesCollection.find({}).toArray()
    const services = persistedServices.map(service => {
      return { id: service._id.toString(), description: service.spanish }
    })
    return services
  }

  async update(dealerToUpdate: Dealer) {
    const servicesCollection = this.databaseInstance.collection('services')
    await Promise.all(dealerToUpdate.getServices().map(async service => {
      await servicesCollection.insertOne({ spanish: service.description }) //TODO: only add services that dont already exist in the collection
    }))
  }
}
