import { User } from '@/domain/models/user'

export interface UsersRepository {
  create(userToCreate: User): Promise<void>
  getBy(username: string): Promise<User>
}
