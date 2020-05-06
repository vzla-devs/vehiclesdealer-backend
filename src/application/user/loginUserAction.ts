import { UsersRepository } from '@/domain/interfaces/usersRepository'

export class LoginUserAction {
  usersRepository: UsersRepository
  execute(command: LoginUserCommand): Promise<void>

  async execute(command: LoginUserCommand) {
    await this.usersRepository.getBy(command.username)
  }

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }
}

export interface LoginUserCommand {
  username: string,
  password: string
}
