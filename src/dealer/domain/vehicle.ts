export interface Vehicle {
}

export interface VehicleDefinition {
  brand: string,
  model: string,
  color: string,
  description: string,
  transmission: VehicleTransmission
  emissions: number,
  fuelType: VehicleFuelType,
  horsepower: number,
  year: number
}

export enum VehicleTransmission {
  manual = 'manual',
  automatic = 'automatic'
}

export enum VehicleFuelType {
  diesel = 'diesel',
  gas = 'gas',
  gasoline = 'gasolina',
  gasoil = 'gasoil',
  hybrid = 'hi­brido'
}
