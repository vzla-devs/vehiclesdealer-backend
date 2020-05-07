export class AddUserError extends Error {
  reason: AddUserErrorReason

  constructor(reason: AddUserErrorReason) {
    super()
    this.reason = reason
  }
}

export enum AddUserErrorReason {
  userAlreadyExists
}
