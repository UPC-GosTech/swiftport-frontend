export class Employee {
  employeeId: number;
  accountId: number;
  name: string;
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.employeeId = 0;
    this.accountId = 0;
    this.name = '';
    this.status = 'ACTIVE';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
