import { Service } from '@/dealer/domain/service'
import { CannotAddDealerService, CannotAddDealerServiceReason } from '@/dealer/domain/errors/cannotAddDealerService'

export class Dealer {
  private services: Array<Service> = []
  private description: string = ''

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

  private checkThatTheServiceCanBeAdded(serviceToAdd: Service): void {
    const servicesWithTheSameDescription = this.services.filter(service => {
      return service.description.toLowerCase() === serviceToAdd.description.toLowerCase()
    })
    if (servicesWithTheSameDescription.length > 0) {
      throw new CannotAddDealerService(CannotAddDealerServiceReason.serviceAlreadyExists)
    }
  }
}
