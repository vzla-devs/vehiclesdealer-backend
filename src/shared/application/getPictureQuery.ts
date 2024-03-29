import fs from 'fs'

function getAsBase64 (pictureToGet) {
  const dotSeparatorPosition = pictureToGet.indexOf('.')
  const pictureFormat = pictureToGet.substring(dotSeparatorPosition + 1, pictureToGet.length)
  const pictureFormatData = `data:image/${pictureFormat};base64,`

  fs.readFile(`public/uploads/${pictureToGet}`, (err, data) => {
    if (err) throw new Error('Ocurrió un error intentando obtener la imagen')
    const pictureBase64Data = pictureFormatData + data.toString('base64')
    return { base64: pictureBase64Data, format: pictureFormat }
  })
}

const getPictureQuery = {
  getAsBase64
}

export { getPictureQuery }
