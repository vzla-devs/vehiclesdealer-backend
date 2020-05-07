import { DomainError } from '@/domain/errors/domainError'

export class UserError extends DomainError {
  reason: UserErrorReason
}

export enum UserErrorReason {
  userAlreadyExists = 'userAlreadyExists',
  userHasInvalidCredentials = 'userHasInvalidCredentials'
}
