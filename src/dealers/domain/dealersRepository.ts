import { DealerModel } from '@/dealers/domain/dealerModel'

export interface DealersRepository {
  get(): Promise<DealerModel>
  update(dealer: DealerModel): Promise<void>
}
