import fs from 'fs'
import Vehicle from '@/domain/models/vehicle'

async function execute (command) {
  const existingVehicle = await Vehicle.findOne({ _id: command.id }).exec()
  if (!existingVehicle) throw new Error('el vehículo no existe')
  if (command.make !== undefined) existingVehicle.make = command.make
  if (command.year !== undefined) existingVehicle.year = command.year
  if (command.fuelType !== undefined) existingVehicle.fuel_type = command.fuelType
  if (command.transmission !== undefined) existingVehicle.transmission = command.transmission
  if (command.color !== undefined) existingVehicle.color = command.color
  if (command.model !== undefined) existingVehicle.model = command.model
  if (command.kilometers !== undefined) existingVehicle.kilometers = command.kilometers
  if (command.horsepower !== undefined) existingVehicle.horsepower = command.horsepower
  if (command.price !== undefined) existingVehicle.price = parseInt(command.price, 10)
  if (command.features !== undefined) existingVehicle.features = command.features
  if (command.services !== undefined) existingVehicle.services = command.services
  if (command.description !== undefined) existingVehicle.description = command.description
  if (command.cylinders !== undefined) existingVehicle.cylinders = command.cylinders
  if (command.featured !== undefined) existingVehicle.featured = command.featured
  if (command.emissions !== undefined) existingVehicle.emissions = command.emissions
  // si se van a eliminar fotos del vehículo
  if (command.picturesToDelete !== undefined) {
    // eliminando fotos previas del vehículo
    command.picturesToDelete.forEach(removedPic => {
      let index = existingVehicle.pictures.findIndex(pic => pic === removedPic)
      // elimina la foto del array de fotos del vehículo
      existingVehicle.pictures.splice(index, 1)
      // elimina la foto del sistema de archivos del servidor
      fs.unlink(`uploads/${removedPic}`, err => {
        if (err) console.error(err)
      })
    })
  }
  await existingVehicle.save()
}

const editVehicleAction = {
  execute
}

export { editVehicleAction }
