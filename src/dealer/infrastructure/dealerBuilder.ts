import { Service } from '@/dealer/domain/service'
import { Dealer } from '@/dealer/domain/dealer'

export class ADealerBuilder {
  private services: Array<Service> = []
  private description: string = ''

  withServices(services: Array<Service>): ADealerBuilder {
    this.services = services
    return this
  }

  withDescription(description: string): ADealerBuilder {
    this.description = description
    return this
  }

  build(): Dealer {
    const dealer = new Dealer()
    this.services.forEach(service => dealer.addService(service))
    dealer.changeDescription(this.description)
    return dealer
  }
}
