import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { User, NoUser } from '@/domain/models/user'

export class AddUserAction {
  usersRepository: UsersRepository
  execute(command: AddUserCommand): Promise<void>

  async execute(command: AddUserCommand) {
    const existingUser = await this.usersRepository.getBy(command.username)
    if (existingUser instanceof NoUser) {
      const userToCreate = new User(command.username, command.password)
      await this.usersRepository.create(userToCreate)
    } else {
      throw new Error('the user already exists')
    }
  }

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }
}

export interface AddUserCommand {
  username: string,
  password: string
}
