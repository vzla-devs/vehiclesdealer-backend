import { Service } from '@/dealer/domain/service'
import { Dealer } from '@/dealer/domain/dealer'

export class DealerBuilder {
  private services: Array<Service> = []

  withServices(services: Array<Service>): DealerBuilder {
    this.services = services
    return this
  }

  build(): Dealer {
    const dealer = new Dealer()
    this.services.forEach(service => dealer.addService(service))
    return dealer
  }
}
