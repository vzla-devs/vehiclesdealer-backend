import { Db, MongoClient } from 'mongodb'
import { getDatabaseConnectionForTests } from '@/shared/infrastructure/persistenceFactory'

export class MongoDBTests {
  private connection: MongoClient
  private databaseInstance: Db
  private collectionsToClean: Array<string>

  constructor(collectionsToClean: Array<string>) {
    this.collectionsToClean = collectionsToClean
  }

  async createDatabaseInstance(): Promise<Db> {
    this.connection = await getDatabaseConnectionForTests()
    this.databaseInstance = this.connection.db()
    return this.databaseInstance
  }

  async cleanCollections(): Promise<void> {
    this.collectionsToClean.forEach(async collection => {
      await this.databaseInstance.collection(collection).deleteMany({})
    })
  }

  async closeDatabaseConnection(): Promise<void> {
    await this.connection.close()
  }
}
