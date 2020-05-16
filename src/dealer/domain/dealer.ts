export interface DealerModel {
  getName(): string
  getServices(): Array<string>
}

export class Dealer implements DealerModel {
  private name: string
  private services: Array<string>

  constructor(name: string, services: Array<string>) {
    this.name = name
    this.services = services
  }

  getName() {
    return this.name
  }

  getServices() {
    return this.services
  }
}
