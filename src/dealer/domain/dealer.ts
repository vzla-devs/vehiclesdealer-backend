import { Service } from '@/dealer/domain/service'
import { DealerError, DealerErrorReason } from '@/dealer/domain/dealerError'

export interface DealerModel {
  getServices(): Array<Service>
  addService(serviceDescription: Service): void
  getDescription(): string
  addDescription(description: string): void
}

export class Dealer implements DealerModel {
  private services: Array<Service> = []
  private description: string = ''

  getServices() {
    return this.services
  }

  addService(serviceToAdd: Service) {
    this.checkThatTheServiceCanBeAdded(serviceToAdd)
    this.services.push(serviceToAdd)
  }

  getDescription() {
    return this.description
  }

  addDescription(description: string) {
    this.description = description
  }

  private checkThatTheServiceCanBeAdded(serviceToAdd: Service): void {
    const servicesWithTheSameDescription = this.services.filter(service => {
      return service.description.toLowerCase() === serviceToAdd.description.toLowerCase()
    })
    if (servicesWithTheSameDescription.length > 0) throw new DealerError(DealerErrorReason.serviceAlreadyExists)
  }
}
