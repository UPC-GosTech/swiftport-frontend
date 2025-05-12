import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SelectorComponent } from '../../../../shared/components/selector/selector.component';
import { TaskScheduling } from '../../model/taskScheduling.entity';
import { Task } from '../../model/task.entity';

@Component({
  selector: 'app-task-scheduling-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ButtonComponent,
    SelectorComponent
  ],
  templateUrl: './task-scheduling-dialog.component.html',
  styleUrl: './task-scheduling-dialog.component.scss'
})
export class TaskSchedulingDialogComponent implements OnInit {
  schedulingForm: FormGroup;
  availableTeams: { id: number, name: string }[] = [];
  availableEquipments: { id: number, name: string }[] = [];
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskSchedulingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task, scheduling?: TaskScheduling }
  ) {
    this.schedulingForm = this.fb.group({
      taskId: [{ value: '', disabled: true }],
      taskName: [{ value: '', disabled: true }],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      teamId: ['', Validators.required],
      equipmentsIds: [[]],
      comments: [''],
      status: ['programmed', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAvailableResources();
    this.initFormValues();
  }
  
  loadAvailableResources(): void {
    // TODO: Get data from a service
    // Mock data for now
    this.availableTeams = [
      { id: 1, name: 'Equipo A' },
      { id: 2, name: 'Equipo B' },
      { id: 3, name: 'Equipo C' }
    ];
    
    this.availableEquipments = [
      { id: 101, name: 'Camión de combustible' },
      { id: 102, name: 'Escalera móvil' },
      { id: 103, name: 'Equipo de carga' },
      { id: 104, name: 'Transportador de equipaje' }
    ];
  }
  
  initFormValues(): void {
    if (this.data.scheduling) {
      // Editing existing scheduling
      const scheduling = this.data.scheduling;
      const startDate = new Date(scheduling.startTime);
      const endDate = new Date(scheduling.endTime);
      
      this.schedulingForm.patchValue({
        taskId: scheduling.task.taskId,
        taskName: scheduling.task.taskName,
        startDate: startDate,
        startTime: this.formatTime(startDate),
        endDate: endDate,
        endTime: this.formatTime(endDate),
        teamId: scheduling.teamId,
        equipmentsIds: scheduling.equipmentsIds,
        comments: scheduling.comments,
        status: scheduling.status
      });
    } else if (this.data.task) {
      // New scheduling for a task
      this.schedulingForm.patchValue({
        taskId: this.data.task.taskId,
        taskName: this.data.task.taskName
      });
    }
  }
  
  formatTime(date: Date): string {
    return date.toTimeString().substring(0, 5); // Format as HH:MM
  }
  
  onSubmit(): void {
    if (this.schedulingForm.valid) {
      const formValues = this.schedulingForm.value;
      
      // Combine date and time values
      const startDateTime = new Date(formValues.startDate);
      const startTimeParts = formValues.startTime.split(':');
      startDateTime.setHours(Number(startTimeParts[0]), Number(startTimeParts[1]), 0, 0);
      
      const endDateTime = new Date(formValues.endDate);
      const endTimeParts = formValues.endTime.split(':');
      endDateTime.setHours(Number(endTimeParts[0]), Number(endTimeParts[1]), 0, 0);
      
      // Create or update the task scheduling
      const taskScheduling = this.data.scheduling || new TaskScheduling();
      taskScheduling.task = this.data.task || this.data.scheduling!.task;
      taskScheduling.startTime = startDateTime;
      taskScheduling.endTime = endDateTime;
      taskScheduling.teamId = formValues.teamId;
      taskScheduling.equipmentsIds = formValues.equipmentsIds;
      taskScheduling.comments = formValues.comments;
      taskScheduling.status = formValues.status;
      
      this.dialogRef.close(taskScheduling);
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
