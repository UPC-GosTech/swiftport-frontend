export class ExecutionReport {
  reportId: number;
  taskId: number;
  operatorId: number;
  startTime: Date;
  endTime: Date;
  notes: string;
  incidentMediaUrls: string[];
  createdAt: Date;

  constructor() {
    this.reportId = 0;
    this.taskId = 0;
    this.operatorId = 0;
    this.startTime = new Date();
    this.endTime = new Date();
    this.notes = '';
    this.incidentMediaUrls = [];
    this.createdAt = new Date();
  }
}
