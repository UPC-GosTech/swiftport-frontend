export class SignUpResponse {
    public id: number;
    public username: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public active: boolean;
    public roles: string[];
  
    constructor(data: {
      id: number,
      username: string,
      email: string,
      firstName: string,
      lastName: string,
      active: boolean,
      roles: string[]
    }) {
      this.id = data.id;
      this.username = data.username;
      this.email = data.email;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.active = data.active;
      this.roles = data.roles;
    }
  }
  