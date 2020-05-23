import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { AddDealerServiceAction, AddDealerServiceCommand } from '@/dealer/application/addDealerServiceAction'
import { Dealer, DealerModel } from '@/dealer/domain/dealer'
import { tryActionAndGetError } from '@/shared/tests/actionDecorators'
import { DealerError, DealerErrorReason } from '@/dealer/domain/dealerError'

describe('addDealerServiceAction unit tests', () => {
  let dealerRepository: DealerRepository
  let addServiceAction: AddDealerServiceAction

  beforeEach(() => {
    dealerRepository = {
      get: jest.fn(),
      update: jest.fn()
    }
    addServiceAction = new AddDealerServiceAction(dealerRepository)
  })

  it('adds a new dealer service', async() => {
    const givenDealer = new Dealer([])
    givenAMockedDealerRepoGetWith(givenDealer)

    const serviceToAdd: AddDealerServiceCommand = { description: 'anyServiceDescription' }
    await addServiceAction.execute(serviceToAdd)

    expect(dealerRepository.get).toHaveBeenCalled()
    const expectedDealerToUpdate = new Dealer([{ description: 'anyServiceDescription' }])
    expect(dealerRepository.update).toHaveBeenCalledWith(expectedDealerToUpdate)
  })

  it('does not add a dealer service that already exists', async() => {
    const alreadyExistingService = { id: 'anyId', description: 'anyDescription' }
    const givenDealer = new Dealer([alreadyExistingService])
    givenAMockedDealerRepoGetWith(givenDealer)

    const action = tryActionAndGetError(addServiceAction)
    const serviceToAdd: AddDealerServiceCommand = { description: 'anyDescription' }
    const thrownError = await action(serviceToAdd)

    expect(thrownError).toEqual(new DealerError(DealerErrorReason.serviceAlreadyExists))
    expect(dealerRepository.get).toHaveBeenCalled()
    expect(dealerRepository.update).not.toHaveBeenCalled()
  })

  function givenAMockedDealerRepoGetWith(dealer: DealerModel) {
    dealerRepository.get = jest.fn(async() => dealer)
  }
})
