import { Component, OnInit, inject } from '@angular/core';
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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

import { Activity } from '../../model/activity.entity';
import { Task } from '../../model/task.entity';
import { ActivityListComponent } from '../../components/activity-list/activity-list.component';
import { DateNavigatorComponent } from '../../../../shared/components/date-navigator/date-navigator.component';
import { ActivityService } from '../../services/activity.service';
import { TaskService } from '../../services/task.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { ActivityDialogComponent } from '../../components/activity-dialog/activity-dialog.component';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';

interface StorageState {
  activities: Activity[];
  filters: {
    status: string;
    priority: string;
    searchTerm: string;
  };
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
  sorting: {
    field: string;
    direction: 'asc' | 'desc';
  };
  selectedDate: string;
}

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
  displayedActivities: Activity[] = [];

  selectedDate: Date = new Date();

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageIndex = 0;
  totalActivities = 0;

  // Filters
  statusFilter: string = '';
  priorityFilter: string = '';
  searchQuery: string = '';

  sortField: string = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';

  private localStorageService = inject(LocalStorageService);
  private readonly STORAGE_KEY = 'activity_management_state';

  constructor(
    private snackBar: MatSnackBar,
    private activityService: ActivityService,
    private taskService: TaskService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadState();
    this.loadActivities();
  }

  private loadState() {
    const savedState = this.localStorageService.getItem<StorageState>(this.STORAGE_KEY, {
      activities: [],
      filters: {
        status: '',
        priority: '',
        searchTerm: ''
      },
      pagination: {
        currentPage: 1,
        itemsPerPage: 10
      },
      sorting: {
        field: 'date',
        direction: 'desc'
      },
      selectedDate: new Date().toISOString()
    });

    this.statusFilter = savedState.filters.status;
    this.priorityFilter = savedState.filters.priority;
    this.searchQuery = savedState.filters.searchTerm;
    this.pageIndex = savedState.pagination.currentPage - 1;
    this.pageSize = savedState.pagination.itemsPerPage;
    this.sortField = savedState.sorting.field;
    this.sortDirection = savedState.sorting.direction;
    this.selectedDate = new Date(savedState.selectedDate);
    this.activities = savedState.activities;
  }

  private saveState() {
    const state: StorageState = {
      activities: this.activities,
      filters: {
        status: this.statusFilter,
        priority: this.priorityFilter,
        searchTerm: this.searchQuery
      },
      pagination: {
        currentPage: this.pageIndex + 1,
        itemsPerPage: this.pageSize
      },
      sorting: {
        field: this.sortField,
        direction: this.sortDirection
      },
      selectedDate: this.selectedDate.toISOString()
    };

    this.localStorageService.setItem(this.STORAGE_KEY, state);
  }

  loadActivities(): void {
    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        this.activities = activities;
        this.saveState();
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
    this.pageIndex = 0;
    this.filterActivities();
    this.saveState();
  }

  filterActivities(): void {
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
    this.applyFilters();
  }

  onEditActivity(activity: Activity): void {
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      data: {
        activity,
        mode: 'edit'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activityService.updateActivity(result).subscribe({
          next: (updatedActivity) => {
            const index = this.activities.findIndex(a => a.id === updatedActivity.id);
            if (index !== -1) {
              this.activities[index] = updatedActivity;
              this.saveState();
              this.applyFilters();
            }
            this.snackBar.open('Actividad actualizada exitosamente', 'Cerrar', {
              duration: 3000
            });
          },
          error: (error) => {
            this.snackBar.open('Error al actualizar la actividad', 'Cerrar', {
              duration: 3000
            });
            console.error('Error updating activity:', error);
          }
        });
      }
    });
  }

  onDeleteActivity(activityId: number): void {
    this.dialogService.confirm({
      title: 'Eliminar Actividad',
      message: '¿Está seguro de que desea eliminar esta actividad?'
    }).subscribe(result => {
      if (result) {
        this.activityService.deleteActivity(activityId).subscribe({
          next: () => {
            this.activities = this.activities.filter(a => a.id !== activityId);
            this.saveState();
            this.applyFilters();
            this.snackBar.open('Actividad eliminada exitosamente', 'Cerrar', {
              duration: 3000
            });
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
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task,
        activityId: task.activityId,
        mode: 'edit'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result).subscribe({
          next: (updatedTask) => {
            const activityIndex = this.activities.findIndex(a => a.id === updatedTask.activityId);
            if (activityIndex !== -1) {
              const taskIndex = this.activities[activityIndex].tasks.findIndex(t => t.taskId === updatedTask.taskId);
              if (taskIndex !== -1) {
                this.activities[activityIndex].tasks[taskIndex] = updatedTask;
                this.saveState();
                this.applyFilters();
              }
            }
            this.snackBar.open('Tarea actualizada exitosamente', 'Cerrar', {
              duration: 3000
            });
          },
          error: (error) => {
            this.snackBar.open('Error al actualizar la tarea', 'Cerrar', {
              duration: 3000
            });
            console.error('Error updating task:', error);
          }
        });
      }
    });
  }

  onDeleteTask(taskId: number): void {
    this.dialogService.confirm({
      title: 'Eliminar Tarea',
      message: '¿Está seguro de que desea eliminar esta tarea?'
    }).subscribe(result => {
      if (result) {
        this.taskService.deleteTask(taskId).subscribe({
          next: () => {
            this.activities = this.activities.map(activity => ({
              ...activity,
              tasks: activity.tasks.filter(t => t.taskId !== taskId)
            }));
            this.saveState();
            this.applyFilters();
            this.snackBar.open('Tarea eliminada exitosamente', 'Cerrar', {
              duration: 3000
            });
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
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        activityId,
        mode: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.createTask(result).subscribe({
          next: (newTask) => {
            const activityIndex = this.activities.findIndex(a => a.id === activityId);
            if (activityIndex !== -1) {
              this.activities[activityIndex].tasks.push(newTask);
              this.saveState();
              this.applyFilters();
            }
            this.snackBar.open('Tarea creada exitosamente', 'Cerrar', {
              duration: 3000
            });
          },
          error: (error) => {
            this.snackBar.open('Error al crear la tarea', 'Cerrar', {
              duration: 3000
            });
            console.error('Error creating task:', error);
          }
        });
      }
    });
  }

  createActivity(): void {
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      data: {
        mode: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activityService.createActivity(result).subscribe({
          next: (newActivity) => {
            this.activities.push(newActivity);
            this.saveState();
            this.applyFilters();
            this.snackBar.open('Actividad creada exitosamente', 'Cerrar', {
              duration: 3000
            });
          },
          error: (error) => {
            this.snackBar.open('Error al crear la actividad', 'Cerrar', {
              duration: 3000
            });
            console.error('Error creating activity:', error);
          }
        });
      }
    });
  }

  onSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortActivities();
    this.saveState();
  }

  sortActivities(): void {
    this.filteredActivities.sort((a, b) => {
      const aValue = a[this.sortField as keyof Activity];
      const bValue = b[this.sortField as keyof Activity];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return this.sortDirection === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      return 0;
    });
  }
}
