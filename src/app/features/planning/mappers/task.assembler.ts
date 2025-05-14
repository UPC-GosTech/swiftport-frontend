import { Task } from "../model/task.entity";
import { TaskResponse } from "server/models/task.response";

export class TaskAssembler {
  static toResponse(task: Task): TaskResponse {
    return {
      taskId: task.taskId,
      taskName: task.taskName,
      activityId: task.activityId,
      locationId: task.locationId,
      description: task.description,
      status: task.status as 'Pendiente' | 'En progreso' | 'Finalizada',
      progress: task.progress,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    };
  }

  static toEntity(dto: TaskResponse): Task {
    const task = new Task();
    task.taskId = dto.taskId;
    task.taskName = dto.taskName;
    task.activityId = dto.activityId;
    task.locationId = dto.locationId;
    task.description = dto.description;
    task.status = dto.status;
    task.progress = dto.progress;
    task.createdAt = dto.createdAt;
    task.updatedAt = dto.updatedAt;
    return task;
  }
}
