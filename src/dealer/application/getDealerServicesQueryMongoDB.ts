import { Db } from 'mongodb'
import { DealerServiceDto } from '@/dealer/application/dealerServiceDto'

export class GetDealerServicesQueryMongoDB {
  private databaseInstance: Db
  
  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async getAll(): Promise<Array<DealerServiceDto>> {
    const servicesCollection = this.databaseInstance.collection('services')
    const persistedServices = await servicesCollection.find({}).toArray()
    let services: Array<DealerServiceDto> = []
    persistedServices.forEach(service => {
      services.push({ _id: service._id, spanish: service.spanish })
    })
    return services
  }
}
