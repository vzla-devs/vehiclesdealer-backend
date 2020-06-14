import { Db, ObjectId } from 'mongodb'

export class GetDealerServicesQueryMongoDB {
  private databaseInstance: Db
  
  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async execute(): Promise<Array<DealerServiceDto>> {
    const servicesCollection = this.databaseInstance.collection('services')
    const persistedServices = await servicesCollection.find({}).toArray()
    let services: Array<DealerServiceDto> = []
    persistedServices.forEach(service => {
      services.push({ _id: service._id, spanish: service.spanish })
    })
    return services
  }
}

export interface DealerServiceDto {
  _id: ObjectId,
  spanish: string
}
