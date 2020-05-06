import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { User, NoUser } from '@/domain/models/user'

export class AddUserAction {
  usersRepository: UsersRepository
  execute(command: AddUserCommand): Promise<void>

  async execute(command: AddUserCommand) {
    const existingUser = await this.usersRepository.getBy(command.username)
    checkThatTheUserCanBeCreated(existingUser)
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

function checkThatTheUserCanBeCreated (existingUser: User) {
  const userAlreadyExists = !(existingUser instanceof NoUser)
  if (userAlreadyExists) throw new Error('the user already exists')
}
