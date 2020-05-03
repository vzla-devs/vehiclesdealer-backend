import fs from 'fs'
import Vehicle from '@/domain/models/vehicle'

async function execute (id) {
  const vehicleToDelete = await Vehicle.findOne({ _id: id }).exec()
  if (!vehicle) throw new Error('el vehículo no existe')
  vehicleToDelete.pictures.forEach(pic => {
    fs.unlink(`uploads/${pic}`, (err) => {
      if (err) console.log(err)
      console.log(`imagen ${pic} eliminada del servidor`)
    })
  })
  await Vehicle.deleteOne({ _id: id }).exec()
}

const removeVehicleAction = {
  execute
}

export { removeVehicleAction }
