import Vehicle from '@/vehicles/domain/vehicle'

async function getAll () {
  const vehicles = await Vehicle.find({}, {
    _id: 0,
    type: 1,
    make: 1,
    fuel_type: 1,
    year: 1,
    price: 1,
    kilometers: 1
  }).exec()
  let types = vehicles.map(vehicle => vehicle.type)
  let makes = vehicles.map(vehicle => vehicle.make)
  let fuel_types = vehicles.map(vehicle => vehicle.fuel_type)
  let years = vehicles.map(vehicle => vehicle.year)
  let prices = vehicles.map(vehicle => vehicle.price)
  let kilometers = vehicles.map(vehicle => vehicle.kilometers)

  // ordena los tipos de vehículos disponibles
  types = types.sort((a, b) => {
      if (a > b) return 1
      return 0
  })

  // ordena las marcas disponibles
  makes = makes.sort((a, b) => {
      if (a > b) return 1
      return 0
  })

  // ordena los tipos de combustible disponibles
  fuel_types = fuel_types.sort((a, b) => {
      if (a > b) return 1
      return 0
  })

  // ordena los años de los vehículos disponibles
  years = years.sort((a, b) => {
      if (a > b) return 1
      return 0
  })

  // ordena los precios de los vehículos disponibles
  prices = prices.sort((a, b) => {
      if (a > b) return 1
      return 0
  })

  // ordena los kilómetros disponibles
  kilometers = kilometers.sort((a, b) => {
      if (a > b) return 1
      return 0
  })

  const typesWithoutDuplication = new Set(types)
  types = [...typesWithoutDuplication]

  const makesWithoutDuplication = new Set(makes)
  makes = [ ...makesWithoutDuplication ]

  const fuelTypesWithoutDuplication = new Set(fuel_types)
  fuel_types = [ ...fuelTypesWithoutDuplication ]

  const yearsWithoutDuplication = new Set(years)
  years = [ ...yearsWithoutDuplication ]

  const pricesWithoutDuplication = new Set(prices)
  prices = [ ...pricesWithoutDuplication ]

  const kilometersWithoutDuplication = new Set(kilometers)
  kilometers = [ ...kilometersWithoutDuplication ]

  return {
    types,
    makes,
    fuel_types,
    years,
    prices,
    kilometers
  }
}

const getVehicleFiltersQuery = {
  getAll
}

export { getVehicleFiltersQuery }
