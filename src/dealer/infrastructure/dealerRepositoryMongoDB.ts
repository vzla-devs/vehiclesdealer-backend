import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { Dealer } from '@/dealer/domain/dealer'
import { Db } from 'mongodb'

export class DealerRepositoryMongoDB implements DealerRepository {
  private databaseInstance: Db

  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async get() {
    const servicesCollection = this.databaseInstance.collection('services')
    const persistedServices = await servicesCollection.find({}).toArray()
    const services = persistedServices.map(service => service.spanish)
    return new Dealer(services)
  }

  async update(dealerToUpdate: Dealer) {
    const dealersCollection = this.databaseInstance.collection('dealers')
    await dealersCollection.updateOne({}, { $set: { services: dealerToUpdate.getServices() } })
  }
}
