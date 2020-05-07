import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { UserModel } from '@/domain/models/user'

export class LoginUserAction {
  usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }
  
  async execute(command: LoginUserCommand): Promise<void> {
    const user = await this.usersRepository.getBy(command.username)
    this.checkThatTheUserCredentialsAreValid(user, command.password)
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
