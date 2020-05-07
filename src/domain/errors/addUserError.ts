export class AddUserError extends Error {
  reason: AddUserErrorReason

  constructor(reason: AddUserErrorReason) {
    super(reason)
    this.reason = reason
  }
}

export enum AddUserErrorReason {
  userAlreadyExists = 'userAlreadyExists'
}
