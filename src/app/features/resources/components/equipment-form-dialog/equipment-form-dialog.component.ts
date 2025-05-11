import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Equipment } from '../../models/equipment.entity';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {TranslatePipe} from "@ngx-translate/core";

export interface DialogData {
  equipment: Equipment;
  title: string;
}

@Component({
  selector: 'app-equipment-form-dialog',
  standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ButtonComponent,
        TranslatePipe
    ],
  templateUrl: './equipment-form-dialog.component.html',
  styleUrl: './equipment-form-dialog.component.scss'
})
export class EquipmentFormDialogComponent implements OnInit {
  equipmentForm!: FormGroup;
  statusOptions: string[] = ['Disponible', 'Mantenimiento'];
  isNewEquipment: boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EquipmentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.createForm();

    if (this.data.equipment) {
      this.isNewEquipment = this.data.equipment.id === 0;
      this.equipmentForm.patchValue(this.data.equipment);
    }
  }

  createForm(): void {
    this.equipmentForm = this.fb.group({
      id: [0],
      plateNumber: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]{5,10}$/)]],
      type: ['', Validators.required],
      capacityLoad: [0, [Validators.required, Validators.min(0)]],
      capacityPassengers: [0, [Validators.required, Validators.min(0)]],
      status: ['Disponible', Validators.required]
    });
  }

  onSave(): void {
    if (this.equipmentForm.valid) {
      this.dialogRef.close(this.equipmentForm.value);
    } else {
      this.markFormGroupTouched(this.equipmentForm);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Marcar todos los campos como tocados para mostrar errores de validación
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  // Métodos de utilidad para errores
  getErrorMessage(controlName: string): string {
    const control = this.equipmentForm.get(controlName);

    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Este campo es obligatorio';
    }

    if (control.errors['pattern']) {
      return 'Formato inválido. Use letras mayúsculas, números y guiones (5-10 caracteres)';
    }

    if (control.errors['min']) {
      return 'El valor debe ser mayor o igual a 0';
    }

    return 'Error de validación';
  }
}
