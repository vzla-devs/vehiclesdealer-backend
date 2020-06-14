import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { ContactInformation } from '../../domain/contactInformation'

export class ChangeDealerContactInformationAction {
  dealerRepository: DealerRepository

  constructor(dealerRepository: DealerRepository) {
    this.dealerRepository = dealerRepository
  }

  async execute(command: ChangeDealerContactInformationCommand): Promise<void> {
    const existingDealer = await this.dealerRepository.get()
    const newContactInformation: ContactInformation = {
      emails: command.emails,
      phoneNumbers: { mobile: command.mobilePhone, main: command.mainPhone },
      weekdaysInformation: {
        monday: command.monday,
        tuesday: command.tuesday,
        wednesday: command.wednesday,
        thursday: command.thursday,
        friday: command.friday,
        saturday: command.saturday,
      }
    }
    existingDealer.changeContactInformation(newContactInformation)
    await this.dealerRepository.update(existingDealer)
  }
}

export interface ChangeDealerContactInformationCommand {
    mobilePhone: number
    mainPhone: number
    emails: Array<string>
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
}
