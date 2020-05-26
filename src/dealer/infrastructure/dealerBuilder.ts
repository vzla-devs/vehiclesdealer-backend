import { Service } from '@/dealer/domain/service'
import { Dealer } from '@/dealer/domain/dealer'

export class ADealer {
  private services: Array<Service> = []
  private description: string = ''

  withServices(services: Array<Service>): ADealer {
    this.services = services
    return this
  }

  withDescription(description: string): ADealer {
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
