import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { Car } from '@/dealer/domain/car'
import { VehicleDefinition, VehicleTransmission } from '@/dealer/domain/vehicle'

export class AddVehicleAction {
  
  dealerRepository: DealerRepository

  constructor(dealerRepository: DealerRepository) {
    this.dealerRepository = dealerRepository
  }

  async execute(command: AddVehicleCommand): Promise<void> {
    const dealer = await this.dealerRepository.get()
    const carDefinition: VehicleDefinition = {
      brand: command.make,
      model: command.model,
      color: command.color,
      description: command.description,
      emissions: command.emissions,
      horsepower: parseInt(command.horsepower),
      transmission: command.transmission === 'manual' ? VehicleTransmission.manual : VehicleTransmission.automatic,
      fuelType: command.fuel_type
    }
    const carToAdd = new Car(carDefinition)
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
  featured: string,
  features: Array<string>,
  services: Array<string>,
}
