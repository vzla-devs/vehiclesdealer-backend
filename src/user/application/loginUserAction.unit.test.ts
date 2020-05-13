import { UsersRepository } from '@/user/domain/usersRepository'
import { LoginUserAction, LoginUserCommand } from '@/user/application/loginUserAction'
import { UserModel, User, NoUser } from '@/user/domain/user'
import { tryActionAndGetError } from '@/shared/tests/actionDecorators'
import { UserError, UserErrorReason } from '@/user/domain/userError'

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

  it('does not login a user when is not found', async() => {
    const givenUsername = 'anyUsername'
    const givenUserToCreateCommand: LoginUserCommand = { username: givenUsername, password: 'anyPassword' }
    givenAMockedUsersRepoGetByWith(new NoUser())

    const action = tryActionAndGetError(loginUserAction)
    const thrownError = await action(givenUserToCreateCommand)

    expect(thrownError).toEqual(new UserError(UserErrorReason.userHasInvalidCredentials))
    expect(usersRepository.getBy).toHaveBeenCalledWith(givenUsername)
  })

  it('does not login a user when the password mismatches', async() => {
    const givenUsername = 'anyExistingUsername'
    const givenUserToCreateCommand: LoginUserCommand = { username: givenUsername, password: 'anyPassword' }
    givenAMockedUsersRepoGetByWith(new User(givenUsername, 'anyDifferentPassword'))

    const action = tryActionAndGetError(loginUserAction)
    const thrownError = await action(givenUserToCreateCommand)

    expect(thrownError).toEqual(new UserError(UserErrorReason.userHasInvalidCredentials))
    expect(usersRepository.getBy).toHaveBeenCalledWith(givenUsername)
  })

  function givenAMockedUsersRepoGetByWith(user: UserModel) {
    usersRepository.getBy = jest.fn(async() => user)
  }
})