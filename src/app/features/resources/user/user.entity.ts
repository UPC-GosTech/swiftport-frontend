export class User {
  userId: number;
  email: string;
  password: string;
  fullName: string;
  role: 'ADMIN' | 'SUPERVISOR' | 'OPERATOR';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.userId = 0;
    this.email = '';
    this.password = '';
    this.fullName = '';
    this.role = 'OPERATOR';
    this.status = 'ACTIVE';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
