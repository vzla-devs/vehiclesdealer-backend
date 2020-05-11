import { DomainError } from '@/shared/domain/domainError'

export class UserError extends DomainError {
  reason: UserErrorReason
}

export enum UserErrorReason {
  userAlreadyExists = 'userAlreadyExists',
  userHasInvalidCredentials = 'userHasInvalidCredentials'
}
