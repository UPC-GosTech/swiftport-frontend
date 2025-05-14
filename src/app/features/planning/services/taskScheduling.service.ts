import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TaskScheduling } from '../model/taskScheduling.entity';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { TaskSchedulingAssembler } from '../mappers/taskScheduling.assembler';
import { TaskSchedulingResponse } from 'server/models/task-scheduling.response';

const taskSchedulingEndPoint = environment.taskSchedulingEndPoint;

@Injectable({
  providedIn: 'root'
})
export class TaskSchedulingService extends BaseService<TaskSchedulingResponse> {
  constructor() {
    super();
    this.resourceEndpoint = taskSchedulingEndPoint;
  }

  getAllTaskSchedulings(): Observable<TaskScheduling[]> {
    return this.getAll().pipe(
      map(schedulingResponses => 
        schedulingResponses.map(schedulingResponse => 
          TaskSchedulingAssembler.toEntity(schedulingResponse)
        )
      )
    );
  }

  getTaskSchedulingById(id: string): Observable<TaskScheduling | undefined> {
    return this.getById(id).pipe(
      map(schedulingResponse => 
        schedulingResponse ? TaskSchedulingAssembler.toEntity(schedulingResponse) : undefined
      )
    );
  }

  createTaskScheduling(scheduling: TaskScheduling): Observable<TaskScheduling> {
    const schedulingResponse = TaskSchedulingAssembler.toResponse(scheduling);
    return this.create(schedulingResponse).pipe(
      map(createdResponse => TaskSchedulingAssembler.toEntity(createdResponse))
    );
  }

  updateTaskScheduling(scheduling: TaskScheduling): Observable<TaskScheduling> {
    const schedulingResponse = TaskSchedulingAssembler.toResponse(scheduling);
    return this.update(schedulingResponse.id, schedulingResponse).pipe(
      map(updatedResponse => TaskSchedulingAssembler.toEntity(updatedResponse))
    );
  }

  deleteTaskScheduling(id: string): Observable<boolean> {
    return this.delete(id);
  }
} 