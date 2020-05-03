import Vehicle from '@/domain/models/vehicle'

async function execute (command) {
  const vehicle = new Vehicle({
    type: command.type,
    make: command.make,
    year: parseInt(command.year),
    fuel_type: command.fuelType,
    transmission: command.transmission,
    model: command.model,
    color: command.color,
    kilometers: parseInt(command.kilometers),
    horsepower: parseInt(command.horsepower),
    price: parseInt(command.price),
    pictures: [],
    description: command.description,
    features: command.features,
    services: command.services,
    cylinders: command.cylinders,
    featured: command.featured,
    emissions: command.emissions
})
  const addedVehicle = await vehicle.save()
  return addedVehicle._id
}

const addVehicleAction = {
  execute
}

export { addVehicleAction }
