import Vehicle from '@/vehicles/domain/vehicle'

async function getAllFilteredBy (filters) {
 const vehicles = await Vehicle.find(filters, {
    type: 1,
    make: 1,
    model: 1,
    color: 1,
    year: 1, 
    fuel_type: 1, 
    horsepower: 1, 
    kilometers: 1, 
    transmission: 1, 
    price: 1,
    pictures: 1,
    featured: 1
  }).exec()
  return sortVehiclesByBrand(vehicles)
}

function sortVehiclesByBrand (vehicles) {
  return vehicles.sort((a, b) => {
    if (a.make > b.make) return 1
    return 0
  })
}

async function getOneById (id) {
  const vehicle = await Vehicle.findOne({ _id: id })
  .populate('features')
  .populate('services')
  .exec()
  if (!vehicle) throw new Error('el vehículo no existe')
  return vehicle
}

const getVehiclesQuery = {
  getAllFilteredBy,
  getOneById
}

export { getVehiclesQuery }
