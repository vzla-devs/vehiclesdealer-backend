import { UserModel } from '@/user/domain/user'

export interface UsersRepository {
  create(userToCreate: UserModel): Promise<void>
  getBy(username: string): Promise<UserModel>
}
