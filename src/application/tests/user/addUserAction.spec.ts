import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { AddUserAction, AddUserCommand } from '@/application/user/addUserAction'
import { User, NoUser } from '@/domain/models/user'

describe('addUserAction', () => {
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

    const returnedPromise = addUserAction.execute(givenUserToCreateCommand)

    expect(returnedPromise).rejects.toThrowError(new Error('the user already exists'))
    expect(usersRepository.getBy).toHaveBeenCalledWith(givenUsername)
    expect(usersRepository.create).not.toHaveBeenCalled()
  })

  function givenAMockedUsersRepoGetByWith(user: User) {
    usersRepository.getBy = jest.fn(async() => user)
  }
})
