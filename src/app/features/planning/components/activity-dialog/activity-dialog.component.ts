import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Activity } from '../../model/activity.entity';
import { Task } from '../../model/task.entity';

interface DialogData {
  activity?: Activity;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-activity-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent implements OnInit {
  activityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.activityForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      scheduledDate: [new Date(), Validators.required],
      priority: ['medium', Validators.required],
      status: ['pending', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.activity) {
      this.activityForm.patchValue({
        title: this.data.activity.title,
        description: this.data.activity.description,
        scheduledDate: new Date(this.data.activity.scheduledDate),
        priority: this.data.activity.priority,
        status: this.data.activity.status
      });
    }
  }

  onSubmit(): void {
    if (this.activityForm.valid) {
      const formValue = this.activityForm.value;
      const activity: Activity = {
        ...this.data.activity,
        ...formValue,
      };
      this.dialogRef.close(activity);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 