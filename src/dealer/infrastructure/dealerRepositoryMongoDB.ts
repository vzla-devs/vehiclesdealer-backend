import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { Dealer } from '@/dealer/domain/dealerModel'
import { Db } from 'mongodb'

export class DealerRepositoryMongoDB implements DealerRepository {
  private databaseInstance: Db

  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async get() {
    const dealersCollection = this.databaseInstance.collection('dealers')
    const returnedDealer = await dealersCollection.findOne({})
    return new Dealer(returnedDealer.name, returnedDealer.services)
  }

  async update(dealerToUpdate: Dealer) {
    const dealersCollection = this.databaseInstance.collection('dealers')
    await dealersCollection.updateOne({}, { $set: { services: dealerToUpdate.getServices() } })
  }
}
