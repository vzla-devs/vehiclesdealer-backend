import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { Dealer } from '@/dealer/domain/dealer'
import { Db } from 'mongodb'
import { Service } from '@/dealer/domain/service'
import { DealerBuilder } from '@/dealer/infrastructure/dealerBuilder'

export class DealerRepositoryMongoDB implements DealerRepository {
  private databaseInstance: Db

  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async get() {
    const services = await this.getDealerServices()
    return new DealerBuilder().withServices(services).build()
  }

  async update(dealerToUpdate: Dealer) {
    await this.updateDealerServices(dealerToUpdate)
  }

  private async getDealerServices(): Promise<Array<Service>> {
    const servicesCollection = this.databaseInstance.collection('services')
    const persistedServices = await servicesCollection.find({}).toArray()
    const services = persistedServices.map(service => {
      return { id: service._id.toString(), description: service.spanish }
    })
    return services
  }

  private async updateDealerServices(dealerToUpdate: Dealer): Promise<void> {
    const servicesCollection = this.databaseInstance.collection('services')
    const newServices = dealerToUpdate.getServices().filter(service => !service.id)
    await Promise.all(newServices.map(async service => {
      await servicesCollection.insertOne({ spanish: service.description })
    }))
  }
}
