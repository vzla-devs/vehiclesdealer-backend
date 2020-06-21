import { DealerRepository } from '@/dealer/domain/dealerRepository'

export class AddVehicleAction {
  
  dealerRepository: DealerRepository

  constructor(dealerRepository: DealerRepository) {
    this.dealerRepository = dealerRepository
  }

  async execute(command: AddVehicleCommand): Promise<void> {
  }
}

export interface AddVehicleCommand {
  make: string,
  model: string,
  transmission: string,
  emissions: number
  description: string,
  fuel_type: string,
  horsepower: string,
  year: string,
  color: string,
  kilometers: string,
  price: string,
  pictures: Array<string>,
  featured: string,
  features: Array<string>,
  services: Array<string>,
}
