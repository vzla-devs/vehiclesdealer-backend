import { Db } from 'mongodb'
import { MongoDBCollection } from '@/shared/infrastructure/constants/mongoDBCollections'

export class GetDealerContactInformationQueryMongoDB {
  private databaseInstance: Db
  
  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async execute(): Promise<DealerContactInformationDto> {
    const contactCollection = this.databaseInstance.collection(MongoDBCollection.contact)
    const persistedContactInformation = await contactCollection.findOne({})
    return {
      emails: persistedContactInformation.emails,
      mainPhone: persistedContactInformation.mainPhone,
      mobilePhone: persistedContactInformation.mobilePhone,
      monday: persistedContactInformation.monday,
      tuesday: persistedContactInformation.tuesday,
      wednesday: persistedContactInformation.wednesday,
      thursday: persistedContactInformation.thursday,
      friday: persistedContactInformation.friday,
      saturday: persistedContactInformation.saturday
    }
  }
}

export interface DealerContactInformationDto {
  mobilePhone: number
  mainPhone: number
  emails: Array<string>
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
}
