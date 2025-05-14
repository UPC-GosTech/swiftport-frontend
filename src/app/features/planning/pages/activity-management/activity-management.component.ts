import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { Activity } from '../../model/activity.entity';
import { Task } from '../../model/task.entity';
import { ActivityListComponent } from '../../components/activity-list/activity-list.component';
import { DateNavigatorComponent } from '../../../../shared/components/date-navigator/date-navigator.component';
import { ActivityService } from '../../services/activity.service';
import { TaskService } from '../../services/task.service';
import { DialogService } from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-activity-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    ActivityListComponent,
    DateNavigatorComponent
  ],
  templateUrl: './activity-management.component.html',
  styleUrls: ['./activity-management.component.scss']
})
export class ActivityManagementComponent implements OnInit {
  activities: Activity[] = [];
  filteredActivities: Activity[] = [];

  selectedDate: Date = new Date();

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  pageIndex = 0;
  totalActivities = 0;

  // Filters
  statusFilter: string = '';
  priorityFilter: string = '';
  searchQuery: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private activityService: ActivityService,
    private taskService: TaskService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        console.log(activities);
        this.activities = activities;
        this.applyFilters();
      },
      error: (error) => {
        this.snackBar.open('Error al cargar las actividades', 'Cerrar', {
          duration: 3000
        });
        console.error('Error loading activities:', error);
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.activities];

    // Filter by date (comparing only year, month, and day)
    if (this.selectedDate) {
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity.scheduledDate);
        return (
          activityDate.getFullYear() === this.selectedDate.getFullYear() &&
          activityDate.getMonth() === this.selectedDate.getMonth() &&
          activityDate.getDate() === this.selectedDate.getDate()
        );
      });
    }

    if (this.statusFilter) {
      filtered = filtered.filter(activity => activity.status === this.statusFilter);
    }

    if (this.priorityFilter) {
      filtered = filtered.filter(activity => activity.priority === this.priorityFilter);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query)
      );
    }

    this.totalActivities = filtered.length;

    // Apply pagination
    this.filteredActivities = filtered.slice(
      this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize
    );
  }

  onDateChange(date: Date): void {
    this.selectedDate = date;
    this.pageIndex = 0; // Reset to first page
    this.applyFilters();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilters();
  }

  clearFilters(): void {
    this.statusFilter = '';
    this.priorityFilter = '';
    this.searchQuery = '';
    // We don't reset the date because it's our main navigation
    this.pageIndex = 0;
    this.applyFilters();
  }

  onEditActivity(activity: Activity): void {
    // TODO: Implement edit dialog
    this.snackBar.open(`Editando actividad: ${activity.title}`, 'Cerrar', {
      duration: 3000
    });
  }

  onDeleteActivity(activityId: number): void {
    this.dialogService.confirm({
      title: 'Confirmar eliminación',
      message: '¿Está seguro que desea eliminar esta actividad?',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    }).subscribe(confirmed => {
      if (confirmed) {
        this.activityService.deleteActivity(activityId).subscribe({
          next: () => {
            this.snackBar.open('Actividad eliminada exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.loadActivities(); // Reload the list
          },
          error: (error) => {
            this.snackBar.open('Error al eliminar la actividad', 'Cerrar', {
              duration: 3000
            });
            console.error('Error deleting activity:', error);
          }
        });
      }
    });
  }

  onEditTask(task: Task): void {
    // TODO: Implement edit dialog
    this.snackBar.open(`Editando tarea: ${task.taskName}`, 'Cerrar', {
      duration: 3000
    });
  }

  onDeleteTask(taskId: number): void {
    this.dialogService.confirm({
      title: 'Confirmar eliminación',
      message: '¿Está seguro que desea eliminar esta tarea?',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    }).subscribe(confirmed => {
      if (confirmed) {
        this.taskService.deleteTask(taskId).subscribe({
          next: () => {
            this.snackBar.open('Tarea eliminada exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.loadActivities(); // Reload to update task lists
          },
          error: (error) => {
            this.snackBar.open('Error al eliminar la tarea', 'Cerrar', {
              duration: 3000
            });
            console.error('Error deleting task:', error);
          }
        });
      }
    });
  }

  onAddTask(activityId: number): void {
    // TODO: Implement add task dialog
    this.snackBar.open(`Agregando tarea a actividad ID: ${activityId}`, 'Cerrar', {
      duration: 3000
    });
  }

  createActivity(): void {
    // TODO: Implement create dialog
    this.snackBar.open('Creando nueva actividad', 'Cerrar', {
      duration: 3000
    });
  }
}
