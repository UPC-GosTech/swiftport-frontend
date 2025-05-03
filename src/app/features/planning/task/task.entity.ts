export class Task {
  task_id: number;
  requirement_id: number;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;

  constructor() {
    this.task_id = 0;
    this.requirement_id = 0;
    this.description = '';
    this.status = '';
    this.created_at = '';
    this.updated_at = '';
  }

}
