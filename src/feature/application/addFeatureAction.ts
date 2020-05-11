import Feature from '@/feature/domain/feature'

async function execute (command) {
  const featureToAdd = new Feature ({
    type: command.type,
    spanish: command.description
  })
  const addedFeature = await featureToAdd.save()
  return addedFeature._id
}

const addFeatureAction = {
  execute
}

export { addFeatureAction }
