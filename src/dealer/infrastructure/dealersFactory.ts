import { getDatabaseConnection } from '@/shared/infrastructure/persistenceFactory'
import { GetDealerServicesQueryMongoDB } from '@/dealer/application/getDealerServicesQueryMongoDB'

export class DealersFactory {
  static GetDealerServicesQuery(): GetDealerServicesQueryMongoDB {
    const databaseInstance = getDatabaseConnection().db
    return new GetDealerServicesQueryMongoDB(databaseInstance)
  }
}
