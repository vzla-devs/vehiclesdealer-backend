import Service from '@/service/domain/service'

async function execute (command) {
  const service = new Service ({
    spanish: command.description
  })
  await service.save()
}

const addServiceAction = {
  execute
}

export { addServiceAction }
