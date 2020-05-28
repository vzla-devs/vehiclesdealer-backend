import { UsersRepository } from '@/users/domain/usersRepository'
import { RegisterUserAction, RegisterUserCommand } from '@/users/application/registerUserAction'
import { UserModel, User, NoUser } from '@/users/domain/user'
import { decorateActionToGetAnyError } from '@/tests/actionDecoratorsForTests'
import { TestCase } from '@/tests/testCase'
import { CannotRegisterUser, CannotRegisterUserReason } from '@/users/domain/errors/cannotRegisterUser'

describe('registerUserAction unit tests', () => {
  let usersRepository: UsersRepository
  let registerUserAction: RegisterUserAction

  beforeEach(() => {
    usersRepository = {
      getBy: jest.fn(),
      create: jest.fn()
    }
    registerUserAction = new RegisterUserAction(usersRepository)
  })

  it('registers a new user', async() => {
    const givenUsername = 'anyUsername'
    const givenUserToRegisterCommand: RegisterUserCommand = { username: givenUsername, password: 'anyPassword' }
    givenAMockedUsersRepoGetByWith(new NoUser())

    await registerUserAction.execute(givenUserToRegisterCommand)

    expect(usersRepository.getBy).toHaveBeenCalledWith(givenUsername)
    const expectedUserToRegister = new User(givenUsername, 'anyPassword')
    expect(usersRepository.create).toHaveBeenCalledWith(expectedUserToRegister)
  })

  it('does not register a user that already exists', async() => {
    const givenUsername = 'anyExistingUsername'
    const givenUserToRegisterCommand: RegisterUserCommand = { username: givenUsername, password: 'anyPassword' }
    givenAMockedUsersRepoGetByWith(new User(givenUsername, 'anyPassword'))

    const action = decorateActionToGetAnyError(registerUserAction)
    const thrownError = await action(givenUserToRegisterCommand)

    expect(thrownError).toEqual(new CannotRegisterUser(CannotRegisterUserReason.userAlreadyExists))
    expect(usersRepository.getBy).toHaveBeenCalledWith(givenUsername)
    expect(usersRepository.create).not.toHaveBeenCalled()
  })

  describe('when trying to register a user with invalid credentials', () => {
    const testCases: Array<TestCase> = [
      {
        name: 'with an empty username',
        username: '',
        password: 'anyPassword'
      },
      {
        name: 'with a null username',
        username: null,
        password: 'anyPassword'
      },
      {
        name: 'with an undefined username',
        username: undefined,
        password: 'anyPassword'
      },
      {
        name: 'with an empty password',
        username: 'anyUsername',
        password: ''
      },
      {
        name: 'with a null password',
        username: 'anyUsername',
        password: null
      },
      {
        name: 'with an undefined password',
        username: 'anyUsername',
        password: undefined
      }
    ]

    testCases.forEach(testCase => {
      it(`does not register a user ${testCase.name}`, async() => {
        const givenUserToRegisterCommand: RegisterUserCommand = { username: testCase.username, password: testCase.password }
        givenAMockedUsersRepoGetByWith(new NoUser())
    
        const action = decorateActionToGetAnyError(registerUserAction)
        const thrownError = await action(givenUserToRegisterCommand)
    
        expect(thrownError).toEqual(new CannotRegisterUser(CannotRegisterUserReason.userHasInvalidCredentials))
        expect(usersRepository.create).not.toHaveBeenCalled()
      })
    })
  })

  function givenAMockedUsersRepoGetByWith(user: UserModel) {
    usersRepository.getBy = jest.fn(async() => user)
  }
})
