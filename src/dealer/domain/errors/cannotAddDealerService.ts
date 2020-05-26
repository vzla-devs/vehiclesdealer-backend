import { DomainError } from '@/shared/domain/domainError'

export class CannotAddDealerService extends DomainError {
  reason: CannotAddDealerServiceReason
}

export enum CannotAddDealerServiceReason {
  serviceAlreadyExists = 'serviceAlreadyExists'
}
