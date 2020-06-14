import { DealerRepository } from '@/dealer/domain/dealerRepository'

export class AddDealerServiceAction {
  private dealerRepository: DealerRepository

  constructor(dealerRepository: DealerRepository) {
    this.dealerRepository = dealerRepository
  }
  
  async execute(command: AddDealerServiceCommand): Promise<void> {
    const existingDealer = await this.dealerRepository.get()
    existingDealer.addService({ description: command.description })
    await this.dealerRepository.update(existingDealer)
  }
}

export interface AddDealerServiceCommand {
  description: string
}
