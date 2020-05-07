import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { AddUserAction, AddUserCommand } from '@/application/user/addUserAction'
import { UserModel, User, NoUser } from '@/domain/models/user'
import { tryActionAndGetError } from '@/application/decorators'
import { TestCase } from '@/helpers/testCase'
import { UserError, UserErrorReason } from '@/domain/errors/userError'

describe('addUserAction unit tests', () => {
  let usersRepository: UsersRepository
  let addUserAction: AddUserAction

  beforeEach(() => {
    usersRepository = {
      getBy: jest.fn(),
      create: jest.fn()
    }
    addUserAction = new AddUserAction(usersRepository)
  })

  it('adds a new user', async() => {
    const givenUsername = 'anyUsername'
    const givenUserToCreateCommand: AddUserCommand = { username: givenUsername, password: 'anyPassword' }
    givenAMockedUsersRepoGetByWith(new NoUser())

    await addUserAction.execute(givenUserToCreateCommand)

    expect(usersRepository.getBy).toHaveBeenCalledWith(givenUsername)
    const expectedUserToCreate = new User(givenUsername, 'anyPassword')
    expect(usersRepository.create).toHaveBeenCalledWith(expectedUserToCreate)
  })

  it('does not add a user that already exists', async() => {
    const givenUsername = 'anyExistingUsername'
    const givenUserToCreateCommand: AddUserCommand = { username: givenUsername, password: 'anyPassword' }
    givenAMockedUsersRepoGetByWith(new User(givenUsername, 'anyPassword'))

    const action = tryActionAndGetError(addUserAction)
    const thrownError = await action(givenUserToCreateCommand)

    expect(thrownError).toEqual(new UserError(UserErrorReason.userAlreadyExists))
    expect(usersRepository.getBy).toHaveBeenCalledWith(givenUsername)
    expect(usersRepository.create).not.toHaveBeenCalled()
  })

  describe('when trying to create a user with invalid credentials', () => {
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
      it(`does not add a user ${testCase.name}`, async() => {
        const givenUserToCreateCommand: AddUserCommand = { username: testCase.username, password: testCase.password }
        givenAMockedUsersRepoGetByWith(new NoUser())
    
        const action = tryActionAndGetError(addUserAction)
        const thrownError = await action(givenUserToCreateCommand)
    
        expect(thrownError).toEqual(new UserError(UserErrorReason.userHasInvalidCredentials))
        expect(usersRepository.create).not.toHaveBeenCalled()
      })
    })
  })

  function givenAMockedUsersRepoGetByWith(user: UserModel) {
    usersRepository.getBy = jest.fn(async() => user)
  }
})
