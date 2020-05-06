export class User {
  username: string
  password: string
  getCredentials(): any {
    return { username: this.username, password: this.password }
  }

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}

export class NoUser extends User {
  constructor() {
    super('', '')
  }
}
