import { Db } from 'mongodb'
import { DealerServiceDto } from './dealerServiceDto'

export class GetDealerServicesQuery {
  private databaseInstance: Db
  
  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async getAll(): Promise<Array<DealerServiceDto>> {
    const dealersCollection = this.databaseInstance.collection('dealers')
    const dealer = await dealersCollection.findOne({})
    const services = dealer.services.map(service => {
      return { spanish: service }
    })
    return services
  }
}
