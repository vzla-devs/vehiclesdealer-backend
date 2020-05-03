import mongoose from 'mongoose'
import multer from 'multer'

function connectToDatabase () {
  createDatabaseConnection()
  return getDatabaseConnection()
}

function createDatabaseConnection () {
  const connectionString = 'mongodb://localhost:32768/vehiclesdealer'
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
}

function getDatabaseConnection () {
  return mongoose.connection
}

function createMediaStorageUploader (foldername, filename) {
  const storage = getMediaStorage(foldername, filename)
  return getMediaUploader(storage)
}

function getMediaStorage (foldername, filename) {
  return multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, foldername)
    },
    filename: function (req, file, callback) {
      let finalFilename = filename
      finalFilename += getFileFormatExtension(file)
      callback(null, finalFilename)
    }
  })
}

function getFileFormatExtension (file) {
  return file.mimetype === 'image/png' ? '.png' : 'jpeg'
}

function getMediaUploader (storage) {
  return multer({ storage })
}

export { connectToDatabase, createMediaStorageUploader }
