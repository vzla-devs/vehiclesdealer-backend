import { Service } from '@/dealer/domain/service'
import { DealerError, DealerErrorReason } from '@/dealer/domain/dealerError'

export interface DealerModel {
  getServices(): Array<Service>
  addService(serviceDescription: Service): void
}

export class Dealer implements DealerModel {
  private services: Array<Service>

  constructor(services: Array<Service>) {
    this.services = services
  }

  getServices() {
    return this.services
  }

  addService(serviceToAdd: Service) {
    const servicesWithTheSameDescription = this.services.filter(service => service.description === serviceToAdd.description)
    if (servicesWithTheSameDescription.length > 0) {
      throw new DealerError(DealerErrorReason.serviceAlreadyExists)
    }
    this.services.push(serviceToAdd)
  }
}
