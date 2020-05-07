import { UserError, UserErrorReason } from '@/domain/errors/userError'

export interface UserModel {
  getCredentials(): { username: string, password: string }
  login(password: string): void
  isValid(): boolean
}
export class User implements UserModel {
  private username: string
  private password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
    this.checkThatTheCredentialsAreValid()
  }

  private checkThatTheCredentialsAreValid() {
    if (!this.username || this.username === '' || !this.password || this.password === '') {
      throw new UserError(UserErrorReason.userHasInvalidCredentials)
    }
  }

  getCredentials() {
    return { username: this.username, password: this.password }
  }

  login(password: string) {
    if (this.password !== password) throw new Error('the user has invalid credentials')
  }

  isValid() {
    return true
  }
}

export class NoUser implements UserModel {
  login() {
    throw new UserError(UserErrorReason.userHasInvalidCredentials)
  }
  
  getCredentials() {
    return { username: '', password: '' }
  }

  isValid() {
    return false
  }
}
