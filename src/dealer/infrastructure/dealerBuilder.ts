import { Service } from '@/dealer/domain/service'
import { Dealer } from '@/dealer/domain/dealer'

export class DealerBuilder {
  private services: Array<Service> = []
  private description: string = ''

  withServices(services: Array<Service>): DealerBuilder {
    this.services = services
    return this
  }

  withDescription(description: string): DealerBuilder {
    this.description = description
    return this
  }

  build(): Dealer {
    const dealer = new Dealer()
    this.services.forEach(service => dealer.addService(service))
    dealer.addDescription(this.description)
    return dealer
  }
}
