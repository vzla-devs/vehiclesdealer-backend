import { UsersRepository } from '@/users/domain/usersRepository'

export class RegisterUserAction {
  usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(command: RegisterUserCommand): Promise<void> {
    const userToCreate = await this.usersRepository.getBy(command.username)
    userToCreate.register(command.username, command.password)
    await this.usersRepository.create(userToCreate)
  }
}

export interface RegisterUserCommand {
  username: string,
  password: string
}
