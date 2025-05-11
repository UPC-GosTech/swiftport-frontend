import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Zone } from '../../models/zone.entity';
import { ZoneService } from '../../services/zone.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-zone-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent
  ],
  templateUrl: './zone-form-dialog.component.html',
  styleUrls: ['./zone-form-dialog.component.scss']
})
export class ZoneFormDialogComponent implements OnInit {
  zoneForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private zoneService: ZoneService,
    public dialogRef: MatDialogRef<ZoneFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { zone?: Zone }
  ) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.zoneForm = this.fb.group({
      name: [this.data.zone?.name || '', Validators.required],
      description: [this.data.zone?.description || '']
    });
  }
  
  onSubmit(): void {
    if (this.zoneForm.invalid) return;
    
    const { name, description } = this.zoneForm.value;
    
    if (this.data.zone) {
      // Update existing zone
      this.zoneService.updateZone(this.data.zone.id, name, description)
        .subscribe({
          next: (zone) => this.dialogRef.close(zone),
          error: (error) => console.error('Error updating zone:', error)
        });
    } else {
      // Create new zone
      this.zoneService.createZone(name, description)
        .subscribe({
          next: (zone) => this.dialogRef.close(zone),
          error: (error) => console.error('Error creating zone:', error)
        });
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
} 