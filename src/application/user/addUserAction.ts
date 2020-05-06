import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { User } from '@/domain/models/user'

export class AddUserAction {
  usersRepository: UsersRepository
  execute(command: AddUserCommand): Promise<void>

  async execute(command: AddUserCommand) {
    const userToCreate = new User(command.username, command.password)
    await this.usersRepository.create(userToCreate)
  }

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }
}

export interface AddUserCommand {
  username: string,
  password: string
}
