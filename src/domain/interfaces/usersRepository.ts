import { UserModel } from '@/domain/interfaces/userModel'

export interface UsersRepository {
  create(userToCreate: UserModel): Promise<void>
  getBy(username: string): Promise<UserModel>
}
