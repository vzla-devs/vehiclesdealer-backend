import { DealerModel } from '@/dealers/domain/dealerModel'

export interface DealersRepository {
  get(): Promise<DealerModel>
}
