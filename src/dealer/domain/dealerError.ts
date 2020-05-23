import { DomainError } from '@/shared/domain/domainError'

export class DealerError extends DomainError {
  reason: DealerErrorReason
}

export enum DealerErrorReason {
  serviceAlreadyExists = 'serviceAlreadyExists'
}
