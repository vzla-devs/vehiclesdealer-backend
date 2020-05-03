import fs from 'fs'
import Vehicle from '@/domain/models/vehicle'

async function execute (command) {
  const vehicle = await Vehicle.findOne({ _id: command.id }).exec()
  if (!vehicle) throw new Error('el vehículo no existe')
  command.files.forEach(file => {
    sharp(`uploads/${file.filename}`)
    .withMetadata()
    .resize(1920, 1080)
    .toBuffer(`uploads/${file.filename}`, (err, data) => {
        if (err) throw err
        fs.writeFile(`uploads/${file.filename}`, data, 'binary', err => {
            if (err) throw err
        })
    })
  })
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
