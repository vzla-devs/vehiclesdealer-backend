import Financing from '@/domain/models/financing'

async function execute (command) {
  const existingFinancing = await Financing.findOne({}).exec()
  if (!!existingFinancing) {
    existingFinancing.amount = command.amount
    await existingFinancing.save()
  } else {
    const financingToAdd = new Financing ({ amount: command.amount })
    await financingToAdd.save()
  }
}

const changeFinancingAction = {
  execute
}

export { changeFinancingAction }
