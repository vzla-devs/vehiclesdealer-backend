import { Vehicle, VehicleDefinition } from '@/dealer/domain/vehicle'
import { Service } from '@/dealer/domain/service'

export class Car implements Vehicle {
  private definition: VehicleDefinition
  private price: number
  private kilometers: number
  private pictures: Array<string> = []
  private equipments: Array<string>
  private services: Array<Service>
  private featuredInformation: string

  constructor(definition: VehicleDefinition, price: number, kilometers: number, equipments: Array<string>, services: Array<Service>, featuredInformation: string) {
    this.definition = definition
    this.price = price
    this.kilometers = kilometers
    this.equipments = equipments
    this.services = services
    this.featuredInformation = featuredInformation
  }
}
