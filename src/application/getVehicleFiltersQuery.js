import Vehicle from '@/domain/models/vehicle'

async function getVehicleFilters () {
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

  // quita los tipos de vehículos repetidos
  types = [ ...new Set(types) ]

  // quita las marcas repetidas
  makes = [ ...new Set(makes) ]

  // quita los tipos de combustible repetidos
  fuel_types = [ ...new Set(fuel_types) ]

  // quita los años repetidos
  years = [ ...new Set(years) ]

  // quita los precios repetidos
  prices = [ ...new Set(prices) ]

  // quita los kilómetros repetidos
  kilometers = [ ...new Set(kilometers) ]

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
  getVehicleFilters
}

export { getVehicleFiltersQuery }
