import { DomainError } from '@/shared/domain/domainError'

export class CannotLoginUser extends DomainError {
  reason: CannotLoginUserReason
}

export enum CannotLoginUserReason {
  userHasInvalidCredentials = 'userHasInvalidCredentials'
}
