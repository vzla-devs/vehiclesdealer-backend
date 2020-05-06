import { UsersRepository } from '@/domain/interfaces/usersRepository'
import { AddUserAction, AddUserCommand } from '@/application/user/addUserAction'
import { User } from '@/domain/models/user'

describe('addUserAction', () => {
  let usersRepository: UsersRepository
  let addUserAction: AddUserAction

  beforeAll(() => {
    usersRepository = {
      getBy: jest.fn(),
      create: jest.fn()
    }
    addUserAction = new AddUserAction(usersRepository)
  })

  it('adds a new user', async() => {
    const givenUserToCreateCommand: AddUserCommand = { username: 'anyUsername', password: 'anyPassword' }

    await addUserAction.execute(givenUserToCreateCommand)

    const expectedUserToCreate = new User('anyUsername', 'anyPassword')
    expect(usersRepository.create).toHaveBeenCalledWith(expectedUserToCreate)
  })
})
