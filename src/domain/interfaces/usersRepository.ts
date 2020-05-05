import { User } from '@/domain/models/user'

export interface UsersRepository {
  create(userToCreate: User): void
}
