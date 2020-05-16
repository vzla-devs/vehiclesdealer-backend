export interface DealerModel {
  getServices(): Array<string>
}

export class Dealer implements DealerModel {
  private services: Array<string>

  constructor(services: Array<string>) {
    this.services = services
  }

  getServices() {
    return this.services
  }
}
