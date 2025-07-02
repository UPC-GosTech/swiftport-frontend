export class SignInResponse {
  public id: number;
  public username: string;
  public token: string;
  public roles: string[];

  constructor(data: {
    id: number,
    username: string,
    token: string,
    roles: string[]
  }) {
    this.id = data.id;
    this.username = data.username;
    this.token = data.token;
    this.roles = data.roles;
  }
}
