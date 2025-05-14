import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../model/task.entity';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { TaskAssembler } from '../mappers/task.assembler';
import { TaskResponse } from 'server/models/task.response';

const taskEndPoint = environment.taskEndPoint;

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService<TaskResponse> {
  constructor() {
    super();
    this.resourceEndpoint = taskEndPoint;
  }

  getAllTasks(): Observable<Task[]> {
    return this.getAll().pipe(
      map(taskResponses => 
        taskResponses.map(taskResponse => TaskAssembler.toEntity(taskResponse))
      )
    );
  }

  getTaskById(id: number): Observable<Task | undefined> {
    return this.getById(id).pipe(
      map(taskResponse => 
        taskResponse ? TaskAssembler.toEntity(taskResponse) : undefined
      )
    );
  }

  createTask(task: Task): Observable<Task> {
    const taskResponse = TaskAssembler.toResponse(task);
    return this.create(taskResponse).pipe(
      map(createdResponse => TaskAssembler.toEntity(createdResponse))
    );
  }

  updateTask(task: Task): Observable<Task> {
    const taskResponse = TaskAssembler.toResponse(task);
    return this.update(taskResponse.taskId, taskResponse).pipe(
      map(updatedResponse => TaskAssembler.toEntity(updatedResponse))
    );
  }

  deleteTask(id: number): Observable<boolean> {
    return this.delete(id);
  }
}
