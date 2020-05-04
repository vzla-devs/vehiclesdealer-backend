import Financing from '@/domain/models/financing'

async function get () {
  const financing = await Financing.findOne({}).exec()
  return financing
}

const getFinancingQuery = {
  get
}

export { getFinancingQuery }
