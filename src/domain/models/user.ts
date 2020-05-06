import { UserModel } from '@/domain/interfaces/userModel'
export class User implements UserModel {
  private username: string
  private password: string
  
  getCredentials() {
    return { username: this.username, password: this.password }
  }

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
    this.checkThatTheCredentialsAreValid()
  }

  private checkThatTheCredentialsAreValid() {
    if (this.username === '') throw new Error('the user has invalid credentials')
  }
}

export class NoUser implements UserModel {
  getCredentials() {
    return { username: '', password: '' }
  }
}
