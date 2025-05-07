export class Task {
  task_id: number;
  requirement_id: number;
  description: string;
  status: string;
  progress: number;
  created_at: string;
  updated_at: string;

  constructor() {
    this.task_id = 0;
    this.requirement_id = 0;
    this.description = '';
    this.status = '';
    this.progress = 0;
    this.created_at = '';
    this.updated_at = '';
  }

}
