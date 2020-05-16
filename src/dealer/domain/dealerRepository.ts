import { DealerModel } from '@/dealer/domain/dealerModel'

export interface DealerRepository {
  get(): Promise<DealerModel>
  update(dealer: DealerModel): Promise<void>
}
