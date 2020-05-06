import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { LoginUserAction, LoginUserCommand } from '@/application/user/loginUserAction'
import { UserModel, User } from '@/domain/models/user'

describe('loginUserAction unit tests', () => {
  let usersRepository: UsersRepository
  let loginUserAction: LoginUserAction

  beforeEach(() => {
    usersRepository = {
      getBy: jest.fn(),
      create: jest.fn()
    }
    loginUserAction = new LoginUserAction(usersRepository)
  })

  it('logins a user', async() => {
    const givenUsername = 'anyUsername'
    const givenPassword = 'anyPassword'
    const givenUserToLoginCommand: LoginUserCommand = { username: givenUsername, password: givenPassword }
    const givenUser: User = new User(givenUsername, givenPassword)
    givenAMockedUsersRepoGetByWith(givenUser)

    await loginUserAction.execute(givenUserToLoginCommand)

    expect(usersRepository.getBy).toHaveBeenCalledWith(givenUsername)
  })

  function givenAMockedUsersRepoGetByWith(user: UserModel) {
    usersRepository.getBy = jest.fn(async() => user)
  }
})
