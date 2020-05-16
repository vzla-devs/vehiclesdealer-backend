import { DealerModel } from '@/dealer/domain/dealer'

export interface DealerRepository {
  get(): Promise<DealerModel>
  update(dealer: DealerModel): Promise<void>
}
