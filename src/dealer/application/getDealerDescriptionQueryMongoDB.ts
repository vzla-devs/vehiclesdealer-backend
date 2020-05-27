import { Db } from 'mongodb'

export class GetDealerDescriptionQueryMongoDB {
  private databaseInstance: Db
  
  constructor(databaseInstance: Db) {
    this.databaseInstance = databaseInstance
  }

  async execute(): Promise<DealerDescriptionDto> {
    const aboutsCollection = this.databaseInstance.collection('abouts')
    const persistedDescription = await aboutsCollection.findOne({})
    return { text: persistedDescription.text }
  }
}

export interface DealerDescriptionDto {
  text: string
}
