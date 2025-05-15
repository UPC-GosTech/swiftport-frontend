import { Component, OnInit, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { addHours, addDays, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

import { DateNavigatorComponent } from '../../../../shared/components/date-navigator/date-navigator.component';
import { TaskScheduling } from '../../model/taskScheduling.entity';
import { Task } from '../../model/task.entity';
import { TaskSchedulingDialogComponent } from '../../components/task-scheduling-dialog/task-scheduling-dialog.component';
import { UnscheduledTaskCardComponent } from '../../components/unscheduled-task-card/unscheduled-task-card.component';
import { ScheduledTaskCardComponent } from '../../components/scheduled-task-card/scheduled-task-card.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Columns, Sort, SortDirection } from '../../../../shared/components/table/table.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../../../shared/services/dialog.service';

interface CalendarEvent {
  id?: string | number;
  title: string;
  start: Date;
  end?: Date;
  meta?: any;
}

interface CalendarEventTimesChangedEvent {
  event: CalendarEvent;
  newStart: Date;
  newEnd?: Date;
}

interface StorageState {
  taskSchedules: TaskScheduling[];
  unscheduledTasks: Task[];
  viewMode: 'calendar' | 'table';
  searchTerm: string;
  scheduledTasksSort: Sort;
  unscheduledTasksSort: Sort;
  selectedDate: string;
  statusFilter: string;
  priorityFilter: string;
  startDate: string | null;
  endDate: string | null;
  showCompleted: boolean;
  groupBy: 'none' | 'status' | 'priority';
}

@Component({
  selector: 'app-task-planning',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    DragDropModule,
    DateNavigatorComponent,
    UnscheduledTaskCardComponent,
    ScheduledTaskCardComponent,
    TableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './task-planning.component.html',
  styleUrl: './task-planning.component.scss'
})
export class TaskPlanningComponent implements OnInit {
  @ViewChild('scheduledActionsTemplate') scheduledActionsTemplate!: TemplateRef<any>;
  @ViewChild('unscheduledActionsTemplate') unscheduledActionsTemplate!: TemplateRef<any>;
  @ViewChild('customEventTitle') customEventTitleTemplate!: TemplateRef<any>;

  selectedDate: Date = new Date();
  viewDate: Date = new Date();
  viewMode: 'calendar' | 'table' = 'calendar';
  
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  
  taskSchedules: TaskScheduling[] = [];
  unscheduledTasks: Task[] = [];
  filteredUnscheduledTasks: Task[] = [];
  searchTerm: string = '';
  
  draggingTask: boolean = false;
  
  timeSlots: string[] = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : `${i}`;
    return `${hour}:00`;
  });

  scheduledTasksColumns: Columns[] = [];
  unscheduledTasksColumns: Columns[] = [];
  scheduledTasksSort: Sort = { active: 'startTime', direction: SortDirection.ASC };
  unscheduledTasksSort: Sort = { active: 'taskName', direction: SortDirection.ASC };

  // Filter properties
  statusFilter: string = '';
  priorityFilter: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  // View settings
  showCompleted: boolean = true;
  groupBy: 'none' | 'status' | 'priority' = 'none';

  private localStorageService = inject(LocalStorageService);
  private readonly STORAGE_KEY = 'task_planning_state';

  constructor(
    private dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {
    this.initTableColumns();
  }

  ngOnInit(): void {
    this.loadState();
    this.loadTasksForDate(this.selectedDate);
  }
  
  initTableColumns(): void {
    this.scheduledTasksColumns = [
      {
        header: { key: 'task.taskName', label: 'Tarea' },
        cell: 'task.taskName',
        type: 'text',
        sortable: true,
        hide: { label: 'Tarea', visible: true }
      },
      {
        header: { key: 'startTime', label: 'Inicio' },
        cell: 'startTime',
        type: 'date',
        sortable: true,
        hide: { label: 'Inicio', visible: true }
      },
      {
        header: { key: 'endTime', label: 'Fin' },
        cell: 'endTime',
        type: 'date',
        sortable: true,
        hide: { label: 'Fin', visible: true }
      },
      {
        header: { key: 'status', label: 'Estado' },
        cell: 'status',
        type: 'text',
        sortable: true,
        hide: { label: 'Estado', visible: true }
      },
      {
        header: { key: 'teamId', label: 'Equipo' },
        cell: 'teamId',
        type: 'text',
        sortable: true,
        hide: { label: 'Equipo', visible: true }
      },
      {
        header: { key: 'equipmentsIds', label: 'Equipos' },
        cell: 'equipmentsIds',
        type: 'text',
        sortable: false,
        hide: { label: 'Equipos', visible: true }
      },
      {
        header: { key: 'actions', label: 'Acciones' },
        cell: 'actions',
        type: 'template',
        sortable: false,
        hide: { label: 'Acciones', visible: true }
      }
    ];

    this.unscheduledTasksColumns = [
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
        header: { key: 'actions', label: 'Acciones' },
        cell: 'actions',
        type: 'template',
        sortable: false,
        hide: { label: 'Acciones', visible: true }
      }
    ];
  }
  
  onDateChange(date: Date): void {
    this.selectedDate = date;
    this.viewDate = new Date(date);
    this.loadTasksForDate(date);
    this.saveState();
  }
  
  loadTasksForDate(date: Date): void {
    const newDate = new Date(date);
    
    // Load tasks from localStorage
    const savedState = this.localStorageService.getItem<StorageState>(this.STORAGE_KEY, {
      taskSchedules: [],
      unscheduledTasks: [],
      viewMode: 'calendar',
      searchTerm: '',
      scheduledTasksSort: { active: 'startTime', direction: SortDirection.ASC },
      unscheduledTasksSort: { active: 'taskName', direction: SortDirection.ASC },
      selectedDate: new Date().toISOString(),
      statusFilter: '',
      priorityFilter: '',
      startDate: null,
      endDate: null,
      showCompleted: true,
      groupBy: 'none'
    });

    // Filter tasks for the selected date
    this.taskSchedules = savedState.taskSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.startTime);
      return (
        scheduleDate.getFullYear() === newDate.getFullYear() &&
        scheduleDate.getMonth() === newDate.getMonth() &&
        scheduleDate.getDate() === newDate.getDate()
      );
    });
    
    this.unscheduledTasks = savedState.unscheduledTasks;
    this.filteredUnscheduledTasks = [...this.unscheduledTasks];
    
    this.generateCalendarEvents();
  }

  generateCalendarEvents(): void {
    this.events = this.taskSchedules.map(schedule => {
      return {
        id: schedule.id,
        title: schedule.task.taskName,
        start: new Date(schedule.startTime),
        end: new Date(schedule.endTime),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        meta: {
          taskId: schedule.task.taskId,
          description: schedule.task.description,
          status: schedule.status,
          teamId: schedule.teamId,
          equipmentsIds: schedule.equipmentsIds,
          comments: schedule.comments
        }
      };
    });
    
    this.refresh.next(undefined);
  }

  onTaskDropped(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      // Moved within the same container
    } else {
      const task = event.item.data;
      
      if (task) {
        this.openSchedulingDialog(task);
      }
    }
  }

  onDragStart(event: DragEvent, task: Task): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('type', 'unscheduled-task');
      event.dataTransfer.setData('taskId', task.taskId.toString());
    }
    this.draggingTask = true;
  }

  onDragStartScheduled(event: DragEvent, scheduling: TaskScheduling): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('type', 'scheduled-task');
      event.dataTransfer.setData('schedulingId', scheduling.id);
      event.dataTransfer.setData('taskName', scheduling.task.taskName);
      event.dataTransfer.setData('startHour', scheduling.startTime.getHours().toString());
      event.dataTransfer.effectAllowed = 'move';
    }
    this.draggingTask = true;
  }

  onDragEnd(): void {
    this.draggingTask = false;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(event: DragEvent, timeSlot: string): void {
    event.preventDefault();
    const type = event.dataTransfer?.getData('type');
    
    if (type === 'unscheduled-task') {
      this.handleUnscheduledTaskDrop(event, timeSlot);
    } else if (type === 'scheduled-task') {
      this.handleScheduledTaskDrop(event, timeSlot);
    }
  }

  onDropOutside(event: DragEvent): void {
    event.preventDefault();
    const type = event.dataTransfer?.getData('type');
    
    if (type === 'scheduled-task') {
      const schedulingId = event.dataTransfer?.getData('schedulingId');
      const taskName = event.dataTransfer?.getData('taskName');
      
      if (schedulingId) {
        const scheduling = this.taskSchedules.find(s => s.id === schedulingId);
        if (scheduling) {
          this.dialogService.confirm({
            title: 'Desprogramar Tarea',
            message: `¿Desea quitar la programación de "${taskName}"?`
          }).subscribe(result => {
            if (result) {
              this.unscheduleTask(scheduling);
            }
          });
        }
      }
    }
  }

  handleUnscheduledTaskDrop(event: DragEvent, timeSlot: string): void {
    const taskId = event.dataTransfer?.getData('taskId');
    if (taskId) {
      const task = this.unscheduledTasks.find(t => t.taskId === Number(taskId));
      if (task) {
        this.scheduleTask(task, timeSlot);
      }
    }
  }

  handleScheduledTaskDrop(event: DragEvent, timeSlot: string): void {
    const schedulingId = event.dataTransfer?.getData('schedulingId');
    const taskName = event.dataTransfer?.getData('taskName');
    const oldStartHour = event.dataTransfer?.getData('startHour');
    
    if (schedulingId && oldStartHour) {
      const scheduling = this.taskSchedules.find(s => s.id === schedulingId);
      if (scheduling) {
        const newHour = parseInt(timeSlot.split(':')[0], 10);
        const currentHour = parseInt(oldStartHour, 10);
        
        if (newHour !== currentHour) {
          this.dialogService.reschedule({
            taskName: taskName || scheduling.task.taskName,
            oldTime: `${oldStartHour}:00`,
            newTime: timeSlot
          }).subscribe(result => {
            if (result) {
              const duration = scheduling.endTime.getTime() - scheduling.startTime.getTime();
              const newStartTime = new Date(this.selectedDate);
              newStartTime.setHours(newHour, 0, 0, 0);
              const newEndTime = new Date(newStartTime.getTime() + duration);
              
              scheduling.startTime = newStartTime;
              scheduling.endTime = newEndTime;
              
              this.generateCalendarEvents();
              this.saveState();
              
              this.snackBar.open(`Tarea reprogramada para ${newHour}:00`, 'OK', {
                duration: 3000
              });
            }
          });
        }
      }
    }
  }

  scheduleTask(task: Task, timeSlot: string): void {
    const hour = parseInt(timeSlot.split(':')[0], 10);
    
    const startTime = new Date(this.selectedDate);
    startTime.setHours(hour, 0, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(hour + 1, 0, 0, 0);
    
    const newScheduling = new TaskScheduling();
    newScheduling.id = Date.now().toString();
    newScheduling.task = task;
    newScheduling.startTime = startTime;
    newScheduling.endTime = endTime;
    newScheduling.status = 'programmed';
    
    this.taskSchedules.push(newScheduling);
    
    this.unscheduledTasks = this.unscheduledTasks.filter(t => t.taskId !== task.taskId);
    this.filteredUnscheduledTasks = this.filteredUnscheduledTasks.filter(t => t.taskId !== task.taskId);
    
    this.generateCalendarEvents();
    this.saveState();
    
    this.snackBar.open(`Tarea "${task.taskName}" programada para ${timeSlot}`, 'OK', {
      duration: 3000
    });
  }

  rescheduleTask(scheduling: TaskScheduling, newHour: number): void {
    const duration = scheduling.endTime.getTime() - scheduling.startTime.getTime();
    
    const newStartTime = new Date(this.selectedDate);
    newStartTime.setHours(newHour, 0, 0, 0);
    
    const newEndTime = new Date(newStartTime.getTime() + duration);
    
    scheduling.startTime = newStartTime;
    scheduling.endTime = newEndTime;
    
    this.generateCalendarEvents();
    this.saveState();
    
    this.snackBar.open(`Tarea reprogramada para ${newHour}:00`, 'OK', {
      duration: 3000
    });
  }

  unscheduleTask(scheduling: TaskScheduling): void {
    this.taskSchedules = this.taskSchedules.filter(s => s.id !== scheduling.id);
    
    this.unscheduledTasks.push(scheduling.task);
    this.filteredUnscheduledTasks.push(scheduling.task);
    
    this.generateCalendarEvents();
    this.saveState();
    
    this.snackBar.open(`Tarea "${scheduling.task.taskName}" desprogramada`, 'OK', {
      duration: 3000
    });
  }
  
  cancelScheduling(scheduling: TaskScheduling): void {
    this.dialogService.confirm({
      title: 'Cancelar Programación',
      message: `¿Desea cancelar la programación de "${scheduling.task.taskName}"?`
    }).subscribe(result => {
      if (result) {
        this.unscheduleTask(scheduling);
      }
    });
  }
  
  eventTimesChanged(event: any): void {
    const { event: calendarEvent, newStart, newEnd } = event;
    
    const scheduling = this.taskSchedules.find(s => s.id === calendarEvent.id);
    
    if (scheduling) {
      scheduling.startTime = newStart;
      scheduling.endTime = newEnd || addHours(newStart, 1);
      
      calendarEvent.start = newStart;
      calendarEvent.end = newEnd;
      
      this.refresh.next(undefined);
      this.saveState();
      
      this.snackBar.open(`Tarea reprogramada: ${calendarEvent.title}`, 'OK', {
        duration: 3000
      });
    }
  }
  
  onCalendarEventClick(event: { event: CalendarEvent }): void {
    const calendarEvent = event.event;
    const scheduling = this.taskSchedules.find(s => s.id === calendarEvent.id);
    if (scheduling) {
      this.openSchedulingDialog(undefined, scheduling);
    }
  }
  
  searchTasks(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUnscheduledTasks = [...this.unscheduledTasks];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredUnscheduledTasks = this.unscheduledTasks.filter(task => 
        task.taskName.toLowerCase().includes(searchTermLower) || 
        task.description.toLowerCase().includes(searchTermLower)
      );
    }
    this.saveState();
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'programmed': return 'scheduled';
      case 'completed': return 'completed';
      case 'pending': return 'pending';
      case 'cancelled': return 'cancelled';
      default: return '';
    }
  }
  
  openSchedulingDialog(task?: Task, scheduling?: TaskScheduling): void {
    const dialogRef = this.dialog.open(TaskSchedulingDialogComponent, {
      width: '600px',
      data: { task, scheduling }
    });

    dialogRef.afterClosed().subscribe((result: TaskScheduling) => {
      if (result) {
        if (scheduling) {
          const index = this.taskSchedules.findIndex(s => s.id === scheduling.id);
          if (index !== -1) {
            this.taskSchedules[index] = result;
          }
        } else if (task) {
          this.taskSchedules.push(result);
          this.unscheduledTasks = this.unscheduledTasks.filter(t => t.taskId !== task.taskId);
          this.filteredUnscheduledTasks = this.filteredUnscheduledTasks.filter(t => t.taskId !== task.taskId);
        }
        
        this.generateCalendarEvents();
        this.saveState();
      }
    });
  }
  
  handleScheduledTaskSelection(task: TaskScheduling): void {
    this.openSchedulingDialog(undefined, task);
  }

  handleUnscheduledTaskSelection(task: Task): void {
    this.openSchedulingDialog(task);
  }

  onSortScheduledChange(sort: Sort): void {
    this.scheduledTasksSort = sort;
    this.saveState();
  }

  onSortUnscheduledChange(sort: Sort): void {
    this.unscheduledTasksSort = sort;
    this.saveState();
  }
  
  getSchedulingById(id: string | number | undefined): TaskScheduling {
    const scheduling = this.taskSchedules.find(s => s.id === id?.toString());
    if (!scheduling) {
      throw new Error(`No se encontró la programación con ID ${id}`);
    }
    return scheduling;
  }

  private loadState() {
    const savedState = this.localStorageService.getItem<StorageState>(this.STORAGE_KEY, {
      taskSchedules: [],
      unscheduledTasks: [],
      viewMode: 'calendar',
      searchTerm: '',
      scheduledTasksSort: { active: 'startTime', direction: SortDirection.ASC },
      unscheduledTasksSort: { active: 'taskName', direction: SortDirection.ASC },
      selectedDate: new Date().toISOString(),
      statusFilter: '',
      priorityFilter: '',
      startDate: null,
      endDate: null,
      showCompleted: true,
      groupBy: 'none'
    });

    // Generate default tasks if storage is empty
    if (savedState.taskSchedules.length === 0) {
      const today = new Date();
      savedState.taskSchedules = [
        Object.assign(new TaskScheduling(), {
          id: '1',
          task: Object.assign(new Task(), {
            taskId: 1,
            taskName: 'Carga de combustible',
            description: 'Carga de combustible para avión Boeing 737',
            status: 'pending',
            priority: 'high'
          }),
          startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0),
          endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
          status: 'programmed',
          teamId: 1,
          equipmentsIds: [101, 102],
          comments: 'Prioridad alta - Verificar niveles de combustible'
        }),
        Object.assign(new TaskScheduling(), {
          id: '2',
          task: Object.assign(new Task(), {
            taskId: 2,
            taskName: 'Revisión de vuelo',
            description: 'Revisión pre-vuelo de aeronave Airbus A320',
            status: 'pending',
            priority: 'high'
          }),
          startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          status: 'programmed',
          teamId: 2,
          equipmentsIds: [103],
          comments: 'Verificar instrumentos y sistemas'
        }),
        Object.assign(new TaskScheduling(), {
          id: '3',
          task: Object.assign(new Task(), {
            taskId: 3,
            taskName: 'Limpieza de cabina',
            description: 'Limpieza y desinfección de cabina de pasajeros',
            status: 'pending',
            priority: 'medium'
          }),
          startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
          status: 'programmed',
          teamId: 3,
          equipmentsIds: [104],
          comments: 'Incluir desinfección de superficies de contacto'
        })
      ];

      savedState.unscheduledTasks = [
        Object.assign(new Task(), {
          taskId: 4,
          taskName: 'Revisión de equipaje',
          description: 'Revisión de equipaje en zona 3',
          status: 'pending',
          priority: 'medium'
        }),
        Object.assign(new Task(), {
          taskId: 5,
          taskName: 'Mantenimiento de pista',
          description: 'Mantenimiento rutinario de pista principal',
          status: 'pending',
          priority: 'high'
        }),
        Object.assign(new Task(), {
          taskId: 6,
          taskName: 'Control de seguridad',
          description: 'Revisión de sistemas de seguridad del aeropuerto',
          status: 'pending',
          priority: 'high'
        })
      ];

      // Save the default state
      this.localStorageService.setItem(this.STORAGE_KEY, savedState);
    }

    this.viewMode = savedState.viewMode;
    this.searchTerm = savedState.searchTerm;
    this.scheduledTasksSort = savedState.scheduledTasksSort;
    this.unscheduledTasksSort = savedState.unscheduledTasksSort;
    this.selectedDate = new Date(savedState.selectedDate);
    this.statusFilter = savedState.statusFilter;
    this.priorityFilter = savedState.priorityFilter;
    this.startDate = savedState.startDate ? new Date(savedState.startDate) : null;
    this.endDate = savedState.endDate ? new Date(savedState.endDate) : null;
    this.showCompleted = savedState.showCompleted;
    this.groupBy = savedState.groupBy;
  }

  private saveState() {
    const state: StorageState = {
      taskSchedules: this.taskSchedules,
      unscheduledTasks: this.unscheduledTasks,
      viewMode: this.viewMode,
      searchTerm: this.searchTerm,
      scheduledTasksSort: this.scheduledTasksSort,
      unscheduledTasksSort: this.unscheduledTasksSort,
      selectedDate: this.selectedDate.toISOString(),
      statusFilter: this.statusFilter,
      priorityFilter: this.priorityFilter,
      startDate: this.startDate?.toISOString() || null,
      endDate: this.endDate?.toISOString() || null,
      showCompleted: this.showCompleted,
      groupBy: this.groupBy
    };

    this.localStorageService.setItem(this.STORAGE_KEY, state);
  }
}
