import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { UserModel, User, NoUser } from '@/domain/models/user'

export class AddUserAction {
  usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(command: AddUserCommand): Promise<void> {
    const existingUser = await this.usersRepository.getBy(command.username)
    this.checkThatTheUserCanBeCreated(existingUser)
    const userToCreate = new User(command.username, command.password)
    await this.usersRepository.create(userToCreate)
  }

  private checkThatTheUserCanBeCreated(existingUser: UserModel): void {
    const userAlreadyExists = existingUser.isValid()
    if (userAlreadyExists) throw new Error('the user already exists')
  }
}

export interface AddUserCommand {
  username: string,
  password: string
}
