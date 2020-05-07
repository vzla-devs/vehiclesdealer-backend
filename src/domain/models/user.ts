export interface UserModel {
  getCredentials(): { username: string, password: string }
  login(password: string): void
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
      throw new Error('the user has invalid credentials')
    }
  }

  getCredentials() {
    return { username: this.username, password: this.password }
  }

  login(password: string): void {
    if (this.password !== password) throw new Error('the user has invalid credentials')
  }
}

export class NoUser implements UserModel {
  login(password: string): void {
    throw new Error('the user has invalid credentials')
  }
  
  getCredentials() {
    return { username: '', password: '' }
  }
}
