export class PlanificationEntity {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  responsible: string;
  comments: string;
  status: string;
  activityIds: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = '';
    this.title = '';
    this.description = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.createdBy = '';
    this.responsible = '';
    this.comments = '';
    this.status = '';
    this.activityIds = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
