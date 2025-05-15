import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.entity';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss'],
  imports: [
    TranslatePipe,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  standalone: true
})
export class UserEditDialogComponent {
  form: FormGroup;
  roles: string[] = ['admin', 'supervisor', 'operario'];
  statuses: string[] = ['active', 'inactive'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      role: [data.role, Validators.required],
      status: [data.status, Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.data,
        ...this.form.value
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
} 