import { UserModel } from '@/domain/models/user'

export interface UsersRepository {
  create(userToCreate: UserModel): Promise<void>
  getBy(username: string): Promise<UserModel>
}
