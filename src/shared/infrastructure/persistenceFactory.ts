import mongoose from 'mongoose'
import multer from 'multer'

function createDatabaseConnection(uri: string): void {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

function getDatabaseConnection() {
  return mongoose.connection
}

function createMediaStorageUploader(foldername: string, filename: string = '') {
  const storage = getMediaStorage(foldername, filename)
  return getMediaUploader(storage)
}

function getMediaStorage(foldername: string, filename: string) {
  return multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, foldername)
    },
    filename: function (req, file, callback) {
      let finalFilename = filename !== '' ? filename : Date.now().toString()
      finalFilename += getFileFormatExtension(file)
      callback(null, finalFilename)
    }
  })
}

function getFileFormatExtension(file: { mimetype: string }): string {
  return file.mimetype === 'image/png' ? '.png' : '.jpeg'
}

function getMediaUploader (storage) {
  return multer({ storage })
}

export {
  createDatabaseConnection,
  getDatabaseConnection,
  createMediaStorageUploader
}
