export interface DealerModel {
  getServices(): Array<string>
  addService(serviceDescription: string): void
}

export class Dealer implements DealerModel {
  private services: Array<string>

  constructor(services: Array<string>) {
    this.services = services
  }

  getServices() {
    return this.services
  }

  addService(serviceDescription: string) {
    this.services.push(serviceDescription)
  }
}
