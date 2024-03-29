import { Service } from '@/dealer/domain/service'
import { CannotAddDealerService, CannotAddDealerServiceReason } from '@/dealer/domain/errors/cannotAddDealerService'
import { ContactInformation, NoContactInformation } from '@/dealer/domain/contactInformation'
import { Vehicle } from '@/dealer/domain/vehicle'

export class Dealer {
  private services: Array<Service> = []
  private description: string = ''
  private contactInformation: ContactInformation = new NoContactInformation()
  private vehicles: Array<Vehicle> = []

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

  addVehicle(vehicle: Vehicle): void {
    this.vehicles.push(vehicle)
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
