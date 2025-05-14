import { TaskScheduling } from "../model/taskScheduling.entity";
import { TaskAssembler } from "./task.assembler";
import { TaskSchedulingResponse } from "server/models/task-scheduling.response";

export class TaskSchedulingAssembler {
  static toResponse(scheduling: TaskScheduling): TaskSchedulingResponse {
    return {
      id: scheduling.id,
      task: TaskAssembler.toResponse(scheduling.task),
      startTime: scheduling.startTime.toISOString(),
      endTime: scheduling.endTime.toISOString(),
      status: scheduling.status as 'pending' | 'programmed' | 'completed' | 'cancelled',
      teamId: scheduling.teamId,
      equipmentsIds: scheduling.equipmentsIds,
      comments: scheduling.comments
    };
  }

  static toEntity(dto: TaskSchedulingResponse): TaskScheduling {
    const scheduling = new TaskScheduling();
    scheduling.id = dto.id;
    scheduling.task = TaskAssembler.toEntity(dto.task);
    scheduling.startTime = new Date(dto.startTime);
    scheduling.endTime = new Date(dto.endTime);
    scheduling.status = dto.status;
    scheduling.teamId = dto.teamId;
    scheduling.equipmentsIds = dto.equipmentsIds;
    scheduling.comments = dto.comments;
    return scheduling;
  }
} 