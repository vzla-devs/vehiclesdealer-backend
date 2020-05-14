import { UsersRepository } from '@/users/domain/usersRepository'

export class LoginUserAction {
  usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }
  
  async execute(command: LoginUserCommand): Promise<void> {
    const user = await this.usersRepository.getBy(command.username)
    user.login(command.password)
  }
}

export interface LoginUserCommand {
  username: string,
  password: string
}
