import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.entity';
import { Position } from '../../models/position.entity';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  employee: Employee;
  title: string;
  positions: Position[];
}

@Component({
  selector: 'app-employee-form-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ButtonComponent
  ],
  templateUrl: './employee-form-dialog.component.html',
  styleUrl: './employee-form-dialog.component.scss'
})
export class EmployeeFormDialogComponent implements OnInit {
  employeeForm!: FormGroup;
  statusOptions: string[] = ['ACTIVE', 'INACTIVE'];
  isNewEmployee: boolean = true;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  
  ngOnInit(): void {
    this.createForm();
    
    if (this.data.employee) {
      this.isNewEmployee = this.data.employee.id === 0;
      this.employeeForm.patchValue({
        ...this.data.employee,
        positions: this.data.employee.positions.map(p => p.id)
      });
    }
  }
  
  createForm(): void {
    this.employeeForm = this.fb.group({
      id: [0],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      status: ['ACTIVE', [Validators.required]],
      positions: [[], [Validators.required, Validators.minLength(1)]]
    });
  }
  
  getErrorMessage(field: string): string {
    if (this.employeeForm.get(field)?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    
    if (field === 'dni' && this.employeeForm.get(field)?.hasError('pattern')) {
      return 'El DNI debe tener 8 dígitos';
    }
    
    if (field === 'email' && this.employeeForm.get(field)?.hasError('email')) {
      return 'Ingrese un email válido';
    }
    
    if (field === 'phone' && this.employeeForm.get(field)?.hasError('pattern')) {
      return 'El teléfono debe tener 9 dígitos';
    }
    
    if (field === 'positions' && this.employeeForm.get(field)?.hasError('minLength')) {
      return 'Debe seleccionar al menos un cargo';
    }
    
    return 'Campo inválido';
  }
  
  onSave(): void {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      
      // Convert position IDs to position objects
      const positions = formValue.positions.map((id: number) => 
        this.data.positions.find(p => p.id === id)
      ).filter(Boolean);
      
      const employee = new Employee(
        formValue.id,
        formValue.firstName,
        formValue.lastName,
        formValue.dni,
        formValue.email,
        formValue.phone,
        formValue.status,
        positions
      );
      
      this.dialogRef.close(employee);
    } else {
      this.markFormGroupTouched(this.employeeForm);
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
  // Helper method to mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if ((control as FormGroup)?.controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
} 