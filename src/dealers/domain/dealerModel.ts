export interface DealerModel {
  getName(): string
}

export class Dealer implements DealerModel {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  getName() {
    return this.name
  }
}
