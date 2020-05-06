export interface UserModel {
  getCredentials(): { username: string, password: string }
}
