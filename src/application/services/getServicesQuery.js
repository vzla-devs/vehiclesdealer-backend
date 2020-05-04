import Service from '@/domain/models/service'

async function execute () {
  const services = await Service.find({}).exec()
  return services.sort((a, b) => {
    if (a.spanish > b.spanish) return 1
    return 0
  })
}

const getServicesQuery = {
  execute
}

export { getServicesQuery }
