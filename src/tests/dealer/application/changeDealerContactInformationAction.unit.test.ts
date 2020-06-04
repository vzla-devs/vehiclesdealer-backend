import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { ChangeDealerContactInformationAction, ChangeDealerContactInformationCommand } from '@/dealer/application/changeDealerContactInformationAction'
import { Dealer } from '@/dealer/domain/dealer'
import { ADealerBuilder } from '@/dealer/infrastructure/dealerBuilder'
import { ContactInformation } from '@/dealer/domain/contactInformation'

describe('changeDealerDescriptionAction unit tests', () => {
  let dealerRepository: DealerRepository
  let changeContactInformationAction: ChangeDealerContactInformationAction

  beforeEach(() => {
    dealerRepository = {
      get: jest.fn(),
      update: jest.fn()
    }
    changeContactInformationAction = new ChangeDealerContactInformationAction(dealerRepository)
  })

  it('changes a dealer existing contact information', async() => {
    const existingContactInformation: ContactInformation = {
      phoneNumbers: { main: 987654321, mobile: 123456789 },
      emails: ['firstEmail@whatever.com', 'secondEmail@whatever.com'],
      weekdaysInformation: {
        monday: 'anyMonday',
        tuesday: 'anyTuesday',
        wednesday: 'anyWednesday',
        thursday: 'anyThursday',
        friday: 'anyFriday',
        saturday: 'anySaturday',
      }
    }
    const givenDealer = new ADealerBuilder().withContactInformation(existingContactInformation).build()
    givenAMockedDealerRepoGetWith(givenDealer)

    const newContactInformation: ChangeDealerContactInformationCommand = {
      emails: ['newFirst@email.com', 'newSecond@email.com'],
      mainPhone: 9023939,
      mobilePhone: 6002726,
      monday: 'newMonday',
      tuesday: 'newTuesday',
      wednesday: 'newWednesday',
      thursday: 'newThursday',
      friday: 'newFriday',
      saturday: 'newSaturday'
    }
    await changeContactInformationAction.execute(newContactInformation)

    expect(dealerRepository.get).toHaveBeenCalled()
    const expectedNewContactInformation: ContactInformation = {
      emails: newContactInformation.emails,
      phoneNumbers: { mobile: newContactInformation.mobilePhone, main: newContactInformation.mainPhone },
      weekdaysInformation: {
        monday: newContactInformation.monday,
        tuesday: newContactInformation.tuesday,
        wednesday: newContactInformation.wednesday,
        thursday: newContactInformation.thursday,
        friday: newContactInformation.friday,
        saturday: newContactInformation.saturday,
      }
    }
    const expectedDealerToUpdate = new ADealerBuilder().withContactInformation(expectedNewContactInformation).build()
    expect(dealerRepository.update).toHaveBeenCalledWith(expectedDealerToUpdate)
  })

  function givenAMockedDealerRepoGetWith(dealer: Dealer) {
    dealerRepository.get = jest.fn(async() => dealer)
  }
})
