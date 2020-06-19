import { CannotLoginUser, CannotLoginUserReason } from '@/users/domain/errors/cannotLoginUser'
import { CannotRegisterUserReason, CannotRegisterUser } from '@/users/domain/errors/cannotRegisterUser'

export interface UserModel {
  getCredentials(): { username: string, password: string }
  login(password: string): void
  register(username: string, password: string): void
}
export class User implements UserModel {
  private username: string
  private password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  getCredentials() {
    return { username: this.username, password: this.password }
  }

  login(password: string) {
    if (this.password !== password) {
      throw new CannotLoginUser(CannotLoginUserReason.userHasInvalidCredentials)
    }
  }

  register() {
    throw new CannotRegisterUser(CannotRegisterUserReason.userAlreadyExists)
  }
}

export class NoUser implements UserModel {
  private username: string
  private password: string

  login() {
    throw new CannotLoginUser(CannotLoginUserReason.userHasInvalidCredentials)
  }
  
  getCredentials() {
    return { username: this.username, password: this.password }
  }

  register(username: string, password: string) {
    this.username = username
    this.password = password
    this.checkThatTheCredentialsAreValid()
  }

  private checkThatTheCredentialsAreValid() {
    if (!this.username || this.username === '' || !this.password || this.password === '') {
      throw new CannotLoginUser(CannotLoginUserReason.userHasInvalidCredentials)
    }
  }
}
