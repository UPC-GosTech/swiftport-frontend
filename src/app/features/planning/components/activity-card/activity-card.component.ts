import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

import { Activity } from '../../model/activity.entity';
import { Task } from '../../model/task.entity';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatBadgeModule,
    TaskListComponent,
    TranslateModule,
    TranslatePipe
  ],
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent {
  @Input() activity!: Activity;
  @Input() expanded: boolean = false;
  @Output() toggleExpand = new EventEmitter<number>();
  @Output() editActivity = new EventEmitter<Activity>();
  @Output() deleteActivity = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() addTask = new EventEmitter<number>();

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pendiente': return 'status-pending';
      case 'En progreso': return 'status-in-progress';
      case 'Finalizada': return 'status-completed';
      case 'Cancelada': return 'status-cancelled';
      default: return '';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Alta': return 'priority-high';
      case 'Media': return 'priority-medium';
      case 'Baja': return 'priority-low';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Pendiente': return 'schedule';
      case 'En progreso': return 'directions_car';
      case 'Finalizada': return 'check_circle';
      case 'Cancelada': return 'cancel';
      default: return 'info';
    }
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'Alta': return 'priority_high';
      case 'Media': return 'low_priority';
      case 'Baja': return 'low_priority';
      default: return 'low_priority';
    }
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins > 0 ? mins + 'm' : ''}`;
    }
    return `${mins}m`;
  }

  onToggleExpand(): void {
    this.toggleExpand.emit(this.activity.id);
  }

  onEditActivity(): void {
    this.editActivity.emit(this.activity);
  }

  onDeleteActivity(): void {
    this.deleteActivity.emit(this.activity.id);
  }

  onEditTask(task: Task): void {
    this.editTask.emit(task);
  }

  onDeleteTask(taskId: number): void {
    this.deleteTask.emit(taskId);
  }

  onAddTask(): void {
    this.addTask.emit(this.activity.id);
  }
}
