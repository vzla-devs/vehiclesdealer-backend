import { Service } from '@/dealer/domain/service'

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
    this.services.push(serviceToAdd)
  }
}
