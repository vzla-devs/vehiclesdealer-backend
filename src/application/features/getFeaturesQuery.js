import Feature from '@/domain/models/feature'

async function getByType (featureType) {
  const features = await Feature.find({ type: featureType }).exec()
  const sortedFeatures = features.sort((a, b) => {
      if (a.spanish > b.spanish) return 1
      return 0
  })
  return sortedFeatures
}

const getFeaturesQuery = {
  getByType
}

export { getFeaturesQuery }
