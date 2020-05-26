import { getDatabaseConnection } from '@/shared/infrastructure/persistenceFactory'
import { GetDealerServicesQueryMongoDB } from '@/dealer/application/getDealerServicesQueryMongoDB'
import { AddDealerServiceAction } from '@/dealer/application/addDealerServiceAction'
import { DealerRepositoryMongoDB } from '@/dealer/infrastructure/dealerRepositoryMongoDB'

export class DealerFactory {
  static GetDealerServicesQuery(): GetDealerServicesQueryMongoDB {
    const databaseInstance = getDatabaseConnection().db
    return new GetDealerServicesQueryMongoDB(databaseInstance)
  }

  static AddDealerServiceAction(): AddDealerServiceAction {
    const databaseInstance = getDatabaseConnection().db
    const dealerRepository = new DealerRepositoryMongoDB(databaseInstance)
    return new AddDealerServiceAction(dealerRepository)
  }
}
