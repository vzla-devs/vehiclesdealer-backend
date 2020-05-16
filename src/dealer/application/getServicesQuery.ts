import Service from '@/dealer/domain/serviceMixedModel'

async function getAll () {
  const services = await Service.find({}).exec()
  return services
}

const getServicesQuery = {
  getAll
}

export { getServicesQuery }
