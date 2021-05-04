import fs from 'fs'
import Vehicle from '@/vehicles/domain/vehicle'

async function execute (id) {
  const vehicleToDelete = await Vehicle.findOne({ _id: id }).exec()
  if (!vehicleToDelete) throw new Error('el vehículo no existe')
  vehicleToDelete.pictures.forEach(picture => {
    fs.unlink(`public/uploads/${picture}`, (err) => {
      if (err) console.log(err)
    })
  })
  await Vehicle.deleteOne({ _id: id }).exec()
}

const removeVehicleAction = {
  execute
}

export { removeVehicleAction }
