import Vehicle from '@/domain/models/vehicle'

function getAllFilteredBy (filters, callback) {
  Vehicle.find(filters, {
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
  }).exec(callback)
}

const getVehiclesQuery = {
  getAllFilteredBy
}

export { getVehiclesQuery }
