import { DealerRepository } from '@/dealer/domain/dealerRepository'
import { AddVehicleAction, AddVehicleCommand } from '@/dealer/application/actions/addVehicleAction'
import { Dealer } from '@/dealer/domain/dealer'
import { ADealerBuilder } from '@/dealer/infrastructure/dealerBuilder'
import { Service } from '@/dealer/domain/service'
import { Car } from '@/dealer/domain/car'
import { VehicleDefinition, VehicleFuelType, VehicleTransmission } from '@/dealer/domain/vehicle'

describe.skip('addVehicleAction unit tests', () => {
  let dealerRepository: DealerRepository
  let addVehicleAction: AddVehicleAction

  beforeEach(() => {
    dealerRepository = {
      get: jest.fn(),
      update: jest.fn()
    }
    addVehicleAction = new AddVehicleAction(dealerRepository)
  })

  it('adds a new car', async() => {
    const services: Array<Service> = [
      { id: 'firstServiceId', description: 'firstServiceDescription' },
      { id: 'secondServiceId', description: 'secondServiceDescription' },
      { id: 'thirdServiceId', description: 'thirdServiceDescription' }
    ]
    const dealer = new ADealerBuilder().withServices(services).build()
    givenAMockedDealerRepoGetWith(dealer)
    const command: AddVehicleCommand = {
      make: 'anyBrand',
      color: 'anyColor',
      emissions: 998,
      fuel_type: 'gasolina',
      horsepower: '345',
      model: 'anyModel',
      description: 'anyDescription',
      transmission: 'manual',
      year: '2020',
      featured: 'anyFeaturedInformation',
      kilometers: '10000',
      price: '98344',
      features: ['firstEquipment', 'secondEquipment'],
      services: ['thirdServiceId', 'secondServiceId']
    }

    await addVehicleAction.execute(command)

    expect(dealerRepository.get).toHaveBeenCalled()
    const expectedDefinition: VehicleDefinition = {
      brand: 'anyBrand',
      model: 'anyModel',
      description: 'anyDescription',
      color: 'anyColor',
      emissions: 998,
      fuelType: VehicleFuelType.gasoline,
      horsepower: 345,
      transmission: VehicleTransmission.manual,
      year: 2020
    }
    const expectedPrice = 98334
    const expectedKilometers = 10000
    const expectedFeaturedInformation = 'anyFeaturedInformation'
    const expectedEquipments = ['firstEquipment', 'secondEquipment']
    const expectedServices: Array<Service> = [
      { id: 'thirdServiceId', description: 'thirdServiceDescription' },
      { id: 'secondServiceId', description: 'secondServiceDescription' }
    ]
    const expectedVehicle = new Car(expectedDefinition, expectedPrice, expectedKilometers, expectedEquipments, expectedServices, expectedFeaturedInformation)
    const expectedDealer = new ADealerBuilder().withServices(services).withVehicles([expectedVehicle]).build()
    expect(dealerRepository.update).toHaveBeenCalledWith(expectedDealer)
  })

  function givenAMockedDealerRepoGetWith(dealer: Dealer) {
    dealerRepository.get = jest.fn(async() => dealer)
  }
})
