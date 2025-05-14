import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Equipment } from '../../models/equipment.entity';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from "@ngx-translate/core";

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
  isSubmitting: boolean = false;

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
      plateNumber: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{6,7}$/)]],
      type: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      capacityLoad: [0, [Validators.required, Validators.min(0)]],
      capacityPassengers: [0, [Validators.required, Validators.min(0)]],
      status: ['Disponible', [Validators.required]]
    });
  }

  getErrorMessage(field: string): string {
    const control = this.equipmentForm.get(field);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }

    if (control.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }

    if (control.hasError('maxlength')) {
      return `Máximo ${control.errors?.['maxlength'].requiredLength} caracteres`;
    }

    if (field === 'plateNumber' && control.hasError('pattern')) {
      return 'La placa debe tener 6 o 7 caracteres alfanuméricos';
    }

    if ((field === 'capacityLoad' || field === 'capacityPassengers') && control.hasError('min')) {
      return 'El valor debe ser mayor o igual a 0';
    }

    return 'Campo inválido';
  }

  onSave(): void {
    if (this.equipmentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formValue = this.equipmentForm.value;
      const equipment = new Equipment(formValue);

      this.dialogRef.close(equipment);
    } else {
      this.markFormGroupTouched(this.equipmentForm);
    }
  }

  onCancel(): void {
    if (!this.isSubmitting) {
      this.dialogRef.close();
    }
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
