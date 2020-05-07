import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { UserModel, NoUser } from '@/domain/models/user'

export class LoginUserAction {
  usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }
  
  async execute(command: LoginUserCommand): Promise<void> {
    const user = await this.usersRepository.getBy(command.username)
    this.checkThatTheUserIsValid(user, command.password)
    user.login(command.password)
  }

  private checkThatTheUserIsValid(userToCheck: UserModel, password: string): void {
    const userDoesNotExist = userToCheck instanceof NoUser
    if (userDoesNotExist) throw new Error('the user has invalid credentials')
  }
}

export interface LoginUserCommand {
  username: string,
  password: string
}
