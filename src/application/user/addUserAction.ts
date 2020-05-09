import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { User } from '@/domain/models/user'
import { UserError, UserErrorReason } from '@/domain/errors/userError'

export class AddUserAction {
  usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(command: AddUserCommand): Promise<void> {
    await this.checkThatTheUserCanBeCreated(command.username)
    const userToCreate = new User(command.username, command.password)
    await this.usersRepository.create(userToCreate)
  }

  private async checkThatTheUserCanBeCreated(username: string): Promise<void> {
    const existingUser = await this.usersRepository.getBy(username)
    if (existingUser.isValid()) throw new UserError(UserErrorReason.userAlreadyExists)
  }
}

export interface AddUserCommand {
  username: string,
  password: string
}
