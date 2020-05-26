import { Dealer } from '@/dealer/domain/dealer'

export interface DealerRepository {
  get(): Promise<Dealer>
  update(dealer: Dealer): Promise<void>
}
