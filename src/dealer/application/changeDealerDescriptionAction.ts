import { DealerRepository } from '@/dealer/domain/dealerRepository'

export class ChangeDealerDescriptionAction {
  private dealerRepository: DealerRepository

  constructor(dealerRepository: DealerRepository) {
    this.dealerRepository = dealerRepository
  }

  async execute(newDescription: string): Promise<void> {
    const existingDealer = await this.dealerRepository.get()
    existingDealer.changeDescription(newDescription)
    await this.dealerRepository.update(existingDealer)
  }
}
