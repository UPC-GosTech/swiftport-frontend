import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { User } from '../../models/user.entity';
import { Roles } from '../../models/roles.enum';

interface RoleOption {
  value: Roles;
  label: string;
  description: string;
}

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.scss'],
  imports: [
    TranslatePipe,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  standalone: true
})
export class UserCreateDialogComponent {
  form: FormGroup;
  hidePassword = true;
  
  roleOptions: RoleOption[] = [
    {
      value: Roles.Admin,
      label: 'Administrador',
      description: 'Acceso completo al sistema'
    },
    {
      value: Roles.LogisticSupervisor,
      label: 'Supervisor Logístico',
      description: 'Supervisión de operaciones logísticas'
    },
    {
      value: Roles.LogisticOperator,
      label: 'Operador Logístico',
      description: 'Operaciones básicas de logística'
    }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserCreateDialogComponent>
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      roles: [[Roles.LogisticOperator], Validators.required],
      status: [true]
    });
  }

  getRoleLabel(roleValue: Roles): string {
    const role = this.roleOptions.find(r => r.value === roleValue);
    return role ? role.label : roleValue;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  submit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const user = new User(
        undefined,
        formValue.username,
        formValue.email,
        formValue.firstName,
        formValue.lastName,
        formValue.roles,
        formValue.status
      );
      
      this.dialogRef.close({
        user: user,
        password: formValue.password
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} es requerido`;
      if (field.errors['email']) return 'Ingrese un email válido';
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Mínimo ${requiredLength} caracteres`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: {[key: string]: string} = {
      'username': 'Nombre de usuario',
      'firstName': 'Nombre',
      'lastName': 'Apellido',
      'email': 'Correo electrónico',
      'password': 'Contraseña',
      'roles': 'Roles'
    };
    return labels[fieldName] || fieldName;
  }
} 