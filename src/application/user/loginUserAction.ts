import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { UserModel } from '@/domain/models/user'

export class LoginUserAction {
  usersRepository: UsersRepository
  execute(command: LoginUserCommand): Promise<void>

  async execute(command: LoginUserCommand) {
    const user = await this.usersRepository.getBy(command.username)
    this.checkThatTheUserCredentialsAreValid(user, command.password)
  }

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  private checkThatTheUserCredentialsAreValid(userToCheck: UserModel, password: string): void {
    const credentials = userToCheck.getCredentials()
    if (credentials.password !== password) throw new Error('the user has invalid credentials')
  }
}

export interface LoginUserCommand {
  username: string,
  password: string
}
