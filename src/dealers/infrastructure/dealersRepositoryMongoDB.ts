import { DealersRepository } from '@/dealers/domain/dealersRepository'
import { Dealer } from '@/dealers/domain/dealerModel'
import { Db } from 'mongodb'

export class DealersRepositoryMongoDB implements DealersRepository {
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
