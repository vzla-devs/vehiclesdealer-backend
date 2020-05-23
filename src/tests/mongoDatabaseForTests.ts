import { Db, MongoClient } from 'mongodb'

export class MongoDatabaseForTests {
  private connection: MongoClient
  private databaseInstance: Db

  async createDatabaseConnection(): Promise<Db> {
    const uri = process.env.MONGO_URL ? process.env.MONGO_URL : ''
    this.connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.databaseInstance = this.connection.db()
    return this.databaseInstance
  }

  async closeDatabaseConnection(): Promise<void> {
    await this.connection.close()
  }
}
