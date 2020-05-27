import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { ChangeDealerDescriptionAction } from '@/dealer/application/changeDealerDescriptionAction'
import { Dealer } from '@/dealer/domain/dealer'
import { ADealerBuilder } from '@/dealer/infrastructure/dealerBuilder'

describe('changeDealerDescriptionAction unit tests', () => {
  let dealerRepository: DealerRepository
  let changeDescriptionAction: ChangeDealerDescriptionAction

  beforeEach(() => {
    dealerRepository = {
      get: jest.fn(),
      update: jest.fn()
    }
    changeDescriptionAction = new ChangeDealerDescriptionAction(dealerRepository)
  })

  it('changes a dealer description', async() => {
    const givenDealer = new ADealerBuilder().withDescription('').build()
    givenAMockedDealerRepoGetWith(givenDealer)

    const newDescription = 'anyNewDescription'
    await changeDescriptionAction.execute(newDescription)

    expect(dealerRepository.get).toHaveBeenCalled()
    const expectedDealerToUpdate = new ADealerBuilder().withDescription(newDescription).build()
    expect(dealerRepository.update).toHaveBeenCalledWith(expectedDealerToUpdate)
  })

  function givenAMockedDealerRepoGetWith(dealer: Dealer) {
    dealerRepository.get = jest.fn(async() => dealer)
  }
})
