import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { AddDealerServiceAction, AddDealerServiceCommand } from '@/dealer/application/addDealerServiceAction'
import { Dealer } from '@/dealer/domain/dealer'
import { tryActionAndGetError } from '@/tests/actionDecoratorsForTests'
import { DealerError, DealerErrorReason } from '@/dealer/domain/dealerError'
import { TestCase } from '@/tests/testCase'
import { DealerBuilder } from '@/dealer/infrastructure/dealerBuilder'

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
    const givenDealer = new DealerBuilder().build()
    givenAMockedDealerRepoGetWith(givenDealer)

    const serviceToAdd: AddDealerServiceCommand = { description: 'anyServiceDescription' }
    await addServiceAction.execute(serviceToAdd)

    expect(dealerRepository.get).toHaveBeenCalled()
    const expectedDealerToUpdate = new DealerBuilder().withServices([{ description: 'anyServiceDescription' }]).build()
    expect(dealerRepository.update).toHaveBeenCalledWith(expectedDealerToUpdate)
  })

  describe('when trying to add a service that already exists', () => {
    const testCases: Array<TestCase> = [
      {
        name: 'with the same description',
        serviceDescription: 'alreadyExistingService'
      },
      {
        name: 'with the same description in uppercase',
        serviceDescription: 'ALREADYEXISTINGSERVICE'
      },
      {
        name: 'with the same description in lowercase',
        serviceDescription: 'alreadyexistingservice'
      },
      {
        name: 'with the same description in different case',
        serviceDescription: 'ALREADYeXISTINGsERVICE'
      }
    ]

    testCases.forEach(testCase => {
      it(`does not add a dealer service that already exists ${testCase.name}`, async() => {
        const alreadyExistingService = { id: 'anyId', description: 'alreadyExistingService' }
        const givenDealer = new DealerBuilder().withServices([alreadyExistingService]).build()
        givenAMockedDealerRepoGetWith(givenDealer)

        const action = tryActionAndGetError(addServiceAction)
        const serviceToAdd: AddDealerServiceCommand = { description: testCase.serviceDescription }
        const thrownError = await action(serviceToAdd)

        expect(thrownError).toEqual(new DealerError(DealerErrorReason.serviceAlreadyExists))
        expect(dealerRepository.get).toHaveBeenCalled()
        expect(dealerRepository.update).not.toHaveBeenCalled()
      })
    })
  })

  function givenAMockedDealerRepoGetWith(dealer: Dealer) {
    dealerRepository.get = jest.fn(async() => dealer)
  }
})
