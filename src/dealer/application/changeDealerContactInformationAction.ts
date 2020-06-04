import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { ContactInformation } from '../domain/contactInformation'

export class ChangeDealerContactInformationAction {
  dealerRepository: DealerRepository

  constructor(dealerRepository: DealerRepository) {
    this.dealerRepository = dealerRepository
  }

  async execute(contactInformationToChange: ChangeDealerContactInformationCommand): Promise<void> {
    const existingDealer = await this.dealerRepository.get()
    const newContactInformation: ContactInformation = {
      emails: contactInformationToChange.emails,
      phoneNumbers: { mobile: contactInformationToChange.mobilePhone, main: contactInformationToChange.mainPhone },
      weekdaysInformation: {
        monday: contactInformationToChange.monday,
        tuesday: contactInformationToChange.tuesday,
        wednesday: contactInformationToChange.wednesday,
        thursday: contactInformationToChange.thursday,
        friday: contactInformationToChange.friday,
        saturday: contactInformationToChange.saturday,
      }
    }
    existingDealer.changeContactInformation(newContactInformation)
    await this.dealerRepository.update(existingDealer)
  }
}

export interface ChangeDealerContactInformationCommand {
    mobilePhone: Number
    mainPhone: Number
    emails: Array<String>
    monday: String
    tuesday: String
    wednesday: String
    thursday: String
    friday: String
    saturday: String
}
