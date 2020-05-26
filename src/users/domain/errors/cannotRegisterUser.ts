import { DomainError } from '@/shared/domain/domainError'

export class CannotRegisterUser extends DomainError {
  reason: CannotRegisterUserReason
}

export enum CannotRegisterUserReason {
  userAlreadyExists = 'userAlreadyExists',
  userHasInvalidCredentials = 'userHasInvalidCredentials'
}
