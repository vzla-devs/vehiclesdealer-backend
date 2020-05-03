import Vehicle from '@/domain/models/vehicle'

async function execute (command) {
  const vehicle = await Vehicle.findOne({ _id: command.id }).exec()
  if (!vehicle) throw new Error('el vehículo no existe')
  if (command.files.length > 0) {
    const newPictures = command.files.map(pic => `${pic.filename}`)
    vehicle.pictures = [...vehicle.pictures, ...newPictures]
  }
  await vehicle.save()
}

const editVehiclePicturesAction = {
  execute
}

export { editVehiclePicturesAction }
