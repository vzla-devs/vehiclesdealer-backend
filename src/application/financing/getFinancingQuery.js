import Financing from '@/domain/models/financing'

async function execute () {
  const financing = await Financing.findOne({}).exec()
  return financing
}

const getFinancingQuery = {
  execute
}

export { getFinancingQuery }
