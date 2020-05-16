import { Db, MongoClient } from 'mongodb'

export class MongoDatabaseForTests {
  private connection: MongoClient
  private databaseInstance: Db
  private collectionsToClean: Array<string>

  constructor(collectionsToClean: Array<string>) {
    this.collectionsToClean = collectionsToClean
  }

  async createDatabaseConnection(): Promise<Db> {
    const uri = process.env.MONGO_URL ? process.env.MONGO_URL : ''
    this.connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.databaseInstance = this.connection.db()
    return this.databaseInstance
  }

  async cleanDatabaseCollections(): Promise<void> {
    this.collectionsToClean.forEach(async collection => {
      await this.databaseInstance.collection(collection).deleteMany({})
    })
  }

  async closeDatabaseConnection(): Promise<void> {
    await this.connection.close()
  }
}
