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
  
  // Date filter
  selectedDate: Date = new Date();
  
  // Pagination
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  pageIndex = 0;
  totalActivities = 0;
  
  // Filters
  statusFilter: string = '';
  priorityFilter: string = '';
  searchQuery: string = '';

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    // In a real app, you would fetch from a service
    // Mock data for demonstration
    this.activities = Array(15).fill(0).map((_, index) => ({
      id: index + 1,
      title: `Actividad ${index + 1}`,
      description: `Descripción de la actividad ${index + 1}`,
      originLocationId: Math.floor(Math.random() * 100) + 1,
      destinationLocationId: Math.floor(Math.random() * 100) + 1,
      scheduledDate: new Date(Date.now() + (Math.random() - 0.5) * 14 * 24 * 60 * 60 * 1000),
      estimatedDuration: Math.floor(Math.random() * 180) + 30,
      actualStartTime: new Date(),
      actualEndTime: new Date(),
      priority: ['Alta', 'Media', 'Baja'][Math.floor(Math.random() * 3)] as 'Alta' | 'Media' | 'Baja',
      status: ['Pendiente', 'En progreso', 'Finalizada', 'Cancelada'][Math.floor(Math.random() * 4)] as 'Pendiente' | 'En progreso' | 'Finalizada' | 'Cancelada',
      assignedCrewId: `Equipo-${Math.floor(Math.random() * 10) + 1}`,
      vehicleId: `Vehículo-${Math.floor(Math.random() * 5) + 1}`,
      incidentReportIds: [],
      supervisorNotes: 'Sin notas adicionales',
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    this.applyFilters();
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
    // In a real app, this would open a dialog or navigate to edit page
    this.snackBar.open(`Editando actividad: ${activity.title}`, 'Cerrar', {
      duration: 3000
    });
  }

  onDeleteActivity(activityId: number): void {
    // In a real app, this would show a confirmation dialog and then delete
    this.snackBar.open(`Eliminando actividad ID: ${activityId}`, 'Cerrar', {
      duration: 3000
    });
    
    // Mock deletion
    this.activities = this.activities.filter(a => a.id !== activityId);
    this.applyFilters();
  }

  onEditTask(task: Task): void {
    // In a real app, this would open a dialog or navigate to edit page
    this.snackBar.open(`Editando tarea: ${task.taskName}`, 'Cerrar', {
      duration: 3000
    });
  }

  onDeleteTask(taskId: number): void {
    // In a real app, this would show a confirmation dialog and then delete
    this.snackBar.open(`Eliminando tarea ID: ${taskId}`, 'Cerrar', {
      duration: 3000
    });
  }

  onAddTask(activityId: number): void {
    // In a real app, this would open a dialog to create a new task
    this.snackBar.open(`Agregando tarea a actividad ID: ${activityId}`, 'Cerrar', {
      duration: 3000
    });
  }

  createActivity(): void {
    // In a real app, this would open a dialog or navigate to create page
    this.snackBar.open('Creando nueva actividad', 'Cerrar', {
      duration: 3000
    });
  }
}
