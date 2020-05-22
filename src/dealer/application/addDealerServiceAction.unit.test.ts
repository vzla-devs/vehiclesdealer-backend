import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { AddDealerServiceAction, AddDealerServiceCommand } from '@/dealer/application/addDealerServiceAction'
import { Dealer, DealerModel } from '@/dealer/domain/dealer'

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

  function givenAMockedDealerRepoGetWith(dealer: DealerModel) {
    dealerRepository.get = jest.fn(async() => dealer)
  }
})
