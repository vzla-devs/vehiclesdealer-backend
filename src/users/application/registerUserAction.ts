import { UsersRepository } from '@/users/domain/usersRepository'
import { User } from '@/users/domain/user'
import { UserError, UserErrorReason } from '@/users/domain/userError'

export class RegisterUserAction {
  usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(command: RegisterUserCommand): Promise<void> {
    await this.checkThatTheUserCanBeCreated(command.username)
    const userToCreate = new User(command.username, command.password)
    await this.usersRepository.create(userToCreate)
  }

  private async checkThatTheUserCanBeCreated(username: string): Promise<void> {
    const existingUser = await this.usersRepository.getBy(username)
    if (existingUser.isValid()) throw new UserError(UserErrorReason.userAlreadyExists)
  }
}

export interface RegisterUserCommand {
  username: string,
  password: string
}
