import { Service } from '@/dealer/domain/service'
import { Dealer } from '@/dealer/domain/dealer'
import { ContactInformation, NoContactInformation } from '@/dealer/domain/contactInformation'

export class DealerBuilder {
  private services: Array<Service> = []
  private description: string = ''
  private contactInformation: ContactInformation = new NoContactInformation()

  withServices(services: Array<Service>): DealerBuilder {
    this.services = services
    return this
  }

  withDescription(description: string): DealerBuilder {
    this.description = description
    return this
  }

  withContactInformation(contactInformation: ContactInformation): DealerBuilder {
    this.contactInformation = contactInformation
    return this
  }

  build(): Dealer {
    const dealer = new Dealer()
    this.services.forEach(service => dealer.addService(service))
    dealer.changeDescription(this.description)
    dealer.changeContactInformation(this.contactInformation)
    return dealer
  }
}
