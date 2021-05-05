import Service from '@/vehicles/domain/service'

async function getAll () {
  const services = await Service.find({}).exec()
  const sortedServices = services.sort((a, b) => {
      if (a.spanish > b.spanish) return 1
      return 0
  })
  return sortedServices
}


const getServicesQuery = {
  getAll
}

export { getServicesQuery }
