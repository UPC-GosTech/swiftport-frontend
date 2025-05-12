import { Task } from "./task.entity";
export class TaskScheduling {
  id: string;
  task: Task;
  startTime: Date;
  endTime: Date;
  status: string | 'pending' | 'programmed' | 'completed' | 'cancelled';
  teamId: number;
  equipmentsIds: number[];
  comments: string;

  constructor() {
    this.id = '';
    this.task = new Task();
    this.startTime = new Date();
    this.endTime = new Date();
    this.status = 'pending';
    this.teamId = 0;
    this.equipmentsIds = [];
    this.comments = '';
  }
}
