import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Activity } from '../model/activity.entity';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { ActivityAssembler } from '../mappers/activity.assembler';
import { TaskService } from './task.service';
import { Task } from '../model/task.entity';
import { ActivityResponse } from 'server/models/activity.response';

const activityEndPoint = environment.activityEndPoint;

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends BaseService<ActivityResponse> {
  constructor(private taskService: TaskService) {
    super();
    this.resourceEndpoint = activityEndPoint;
  }

  getAllActivities(): Observable<Activity[]> {
    return this.getAll().pipe(
      switchMap(activityResponses => {
        console.log(activityResponses);
        // Primero convertimos las respuestas a entidades
        const activities = activityResponses.map(activityResponse => 
          ActivityAssembler.toEntity(activityResponse)
        );
        
        // Luego obtenemos las tareas para cada actividad
        return this.taskService.getAllTasks().pipe(
          map((tasks: Task[]) => {
            // Asignamos las tareas a cada actividad correspondiente
            return activities.map(activity => {
              activity.tasks = tasks.filter(task => 
                activity.tasksIds?.includes(task.taskId) || false
              );
              return activity;
            });
          })
        );
      })
    );
  }

  getActivityById(id: number): Observable<Activity | undefined> {
    return this.getById(id).pipe(
      switchMap(activityResponse => {
        if (!activityResponse) {
          return new Observable<undefined>(subscriber => subscriber.next(undefined));
        }
        
        const activity = ActivityAssembler.toEntity(activityResponse);
        
        // Obtenemos las tareas de la actividad
        return this.taskService.getAllTasks().pipe(
          map((tasks: Task[]) => {
            activity.tasks = tasks.filter(task => 
              activity.tasksIds.includes(task.taskId)
            );
            return activity;
          })
        );
      })
    );
  }

  createActivity(activity: Activity): Observable<Activity> {
    const activityResponse = ActivityAssembler.toResponse(activity);
    return this.create(activityResponse).pipe(
      map(createdResponse => ActivityAssembler.toEntity(createdResponse))
    );
  }

  updateActivity(activity: Activity): Observable<Activity> {
    const activityResponse = ActivityAssembler.toResponse(activity);
    return this.update(activityResponse.id, activityResponse).pipe(
      map(updatedResponse => ActivityAssembler.toEntity(updatedResponse))
    );
  }

  deleteActivity(id: number): Observable<boolean> {
    return this.delete(id);
  }
}
