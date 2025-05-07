export class Squad {
  squadId: number;
  name: string;
  zone: string;
  leaderId: number;
  members: number[]; // array of employee ides
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.squadId = 0;
    this.name = '';
    this.zone = '';
    this.leaderId = 0;
    this.members = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
