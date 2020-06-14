import { getDatabaseConnection } from '@/shared/infrastructure/persistenceFactory'
import { GetDealerServicesQueryMongoDB } from '@/dealer/application/queries/getDealerServicesQueryMongoDB'
import { AddDealerServiceAction } from '@/dealer/application/actions/addDealerServiceAction'
import { DealerRepositoryMongoDB } from '@/dealer/infrastructure/dealerRepositoryMongoDB'
import { GetDealerDescriptionQueryMongoDB } from '@/dealer/application/queries/getDealerDescriptionQueryMongoDB'
import { ChangeDealerDescriptionAction } from '@/dealer/application/actions/changeDealerDescriptionAction'
import { ChangeDealerContactInformationAction } from '@/dealer/application/actions/changeDealerContactInformationAction'
import { GetDealerContactInformationQueryMongoDB } from '../application/queries/getDealerContactInformationQueryMongoDB'

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

  static GetDealerDescriptionQuery(): GetDealerDescriptionQueryMongoDB {
    const databaseInstance = getDatabaseConnection().db
    return new GetDealerDescriptionQueryMongoDB(databaseInstance)
  }

  static ChangeDealerDescriptionAction(): ChangeDealerDescriptionAction {
    const databaseInstance = getDatabaseConnection().db
    const dealerRepository = new DealerRepositoryMongoDB(databaseInstance)
    return new ChangeDealerDescriptionAction(dealerRepository)
  }

  static ChangeDealerContactInformationAction(): ChangeDealerContactInformationAction {
    const databaseInstance = getDatabaseConnection().db
    const dealerRepository = new DealerRepositoryMongoDB(databaseInstance)
    return new ChangeDealerContactInformationAction(dealerRepository)
  }
  
  static GetDealerContactInformationQuery(): GetDealerContactInformationQueryMongoDB {
    const databaseInstance = getDatabaseConnection().db
    return new GetDealerContactInformationQueryMongoDB(databaseInstance)
  }
}
