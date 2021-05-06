import { Service } from '@/dealer/domain/service'
import { CannotAddDealerService, CannotAddDealerServiceReason } from '@/dealer/domain/errors/cannotAddDealerService'
import { ContactInformation, NoContactInformation } from '@/dealer/domain/contactInformation'

export class Dealer {
  private services: Array<Service> = []
  private description: string = ''
  private contactInformation: ContactInformation = new NoContactInformation()

  getServices(): Array<Service> {
    return this.services
  }

  addService(serviceToAdd: Service): void {
    this.checkThatTheServiceCanBeAdded(serviceToAdd)
    this.services.push(serviceToAdd)
  }

  getDescription(): string {
    return this.description
  }

  changeDescription(description: string): void {
    this.description = description
  }

  getContactInformation(): ContactInformation {
    return this.contactInformation
  }

  changeContactInformation(contactInformation: ContactInformation): void {
    this.contactInformation = contactInformation
  }

  private checkThatTheServiceCanBeAdded(serviceToAdd: Service): void {
    const servicesWithTheSameDescription = this.services.filter(service => {
      return service.description.toLowerCase() === serviceToAdd.description.toLowerCase()
    })
    if (servicesWithTheSameDescription.length > 0) {
      throw new CannotAddDealerService(CannotAddDealerServiceReason.serviceAlreadyExists)
    }
  }
}
