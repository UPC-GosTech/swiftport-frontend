export class Task {
  taskId: number;
  taskName: string;
  activityId: number;
  locationId: number;
  description: string;
  status: string;
  progress: number;
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.taskId = 0;
    this.taskName = '';
    this.activityId = 0;
    this.locationId = 0;
    this.description = '';
    this.status = '';
    this.progress = 0;
    this.createdAt = '';
    this.updatedAt = '';
  }

}
