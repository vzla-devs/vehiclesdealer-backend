import { DomainError } from '@/domain/errors/domainError'

export class AddUserError extends DomainError {
  reason: AddUserErrorReason
}

export enum AddUserErrorReason {
  userAlreadyExists = 'userAlreadyExists'
}
