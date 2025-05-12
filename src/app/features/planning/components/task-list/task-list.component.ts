import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

import { Task } from '../../model/task.entity';
import { Columns, Sort, SortDirection } from '../../../../shared/components/table/table.models';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatChipsModule,
    TableComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() activityId!: number;
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<Sort>();

  tasks: Task[] = [];
  tableColumns: Columns[] = [];
  
  loading = false;
  sort: Sort = { active: 'taskName', direction: SortDirection.ASC };

  constructor() {}

  ngOnInit(): void {
    // Mock data for demostration
    this.tasks = [
      {
        taskId: 1,
        taskName: 'Inspección inicial',
        activityId: this.activityId,
        locationId: 101,
        description: 'Realizar inspección preliminar del sitio',
        status: 'Completado',
        progress: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        taskId: 2,
        taskName: 'Preparación de equipos',
        activityId: this.activityId,
        locationId: 101,
        description: 'Preparar equipos necesarios para la actividad',
        status: 'En progreso',
        progress: 60,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        taskId: 3,
        taskName: 'Documentación',
        activityId: this.activityId,
        locationId: 101,
        description: 'Completar documentación requerida',
        status: 'Pendiente',
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.initTableColumns();
  }

  initTableColumns(): void {
    this.tableColumns = [
      {
        header: { key: 'taskName', label: 'Tarea' },
        cell: 'taskName',
        type: 'text',
        sortable: true,
        hide: { label: 'Tarea', visible: true }
      },
      {
        header: { key: 'description', label: 'Descripción' },
        cell: 'description',
        type: 'text',
        sortable: true,
        hide: { label: 'Descripción', visible: true }
      },
      {
        header: { key: 'status', label: 'Estado' },
        cell: 'status',
        type: 'template',
        sortable: true,
        hide: { label: 'Estado', visible: true }
      },
      {
        header: { key: 'progress', label: 'Progreso' },
        cell: 'progress',
        type: 'template',
        sortable: true,
        hide: { label: 'Progreso', visible: true }
      },
      {
        header: { key: 'actions', label: 'Acciones' },
        cell: 'actions',
        type: 'template',
        sortable: false,
        hide: { label: 'Acciones', visible: true }
      }
    ];
  }

  getProgressColor(progress: number): string {
    if (progress === 100) return 'primary';
    if (progress < 25) return 'warn';
    if (progress < 75) return 'accent';
    return 'primary';
  }

  getStatusChipClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completado': return 'status-completed';
      case 'en progreso': return 'status-in-progress';
      case 'pendiente': return 'status-pending';
      case 'cancelado': return 'status-cancelled';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'completado': return 'check_circle';
      case 'en progreso': return 'schedule';
      case 'pendiente': return 'pending';
      case 'cancelado': return 'cancel';
      default: return 'help';
    }
  }

  onEditTask(task: Task): void {
    this.editTask.emit(task);
  }

  onDeleteTask(taskId: number): void {
    this.deleteTask.emit(taskId);
  }

  onTableRowSelect(task: Task): void {
    this.editTask.emit(task);
  }
} 