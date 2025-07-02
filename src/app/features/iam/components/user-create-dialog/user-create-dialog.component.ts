import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.scss'],
  imports: [
    TranslatePipe,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  standalone: true
})
export class UserCreateDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserCreateDialogComponent>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['operario', Validators.required],
      status: ['active', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
} 