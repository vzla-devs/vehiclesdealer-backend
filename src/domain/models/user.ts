export interface UserModel {
  getCredentials(): { username: string, password: string }
}
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
    if (!this.username || this.username === '' || !this.password || this.password === '') {
      throw new Error('the user has invalid credentials')
    }
  }
}

export class NoUser implements UserModel {
  getCredentials() {
    return { username: '', password: '' }
  }
}
