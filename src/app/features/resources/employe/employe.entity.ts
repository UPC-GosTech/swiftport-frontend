export class Employe {
  employeId: number;
  accountId: number;
  name: string;
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.employeId = 0;
    this.accountId = 0;
    this.name = '';
    this.status = 'ACTIVE';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
