import Financing from '@/domain/models/financing'

async function execute (command) {
  const existingFinancing = await Financing.findOne({}).exec()
  if (!existingFinancing) {
    const financingToAdd = new Financing ({ amount: command.amount })
    await financingToAdd.save()
  } else {
    existingFinancing.amount = command.amount
    await existingFinancing.save()
  }
}

const changeFinancingAction = {
  execute
}

export { changeFinancingAction }
