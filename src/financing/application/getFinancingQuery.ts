import Financing from '@/financing/domain/financing'

async function get () {
  const financing = await Financing.findOne({}).exec()
  return financing
}

const getFinancingQuery = {
  get
}

export { getFinancingQuery }
