import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Location } from '../../models/location.entity';
import { ZoneService } from '../../services/zone.service';
import { Coordinate } from '../../models/coordinate.entity';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {TranslatePipe} from '@ngx-translate/core';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
    TranslatePipe
  ],
  templateUrl: './location-form-dialog.component.html',
  styleUrls: ['./location-form-dialog.component.scss']
})
export class LocationFormDialogComponent implements OnInit {
  locationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private zoneService: ZoneService,
    private locationService: LocationService,
    public dialogRef: MatDialogRef<LocationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      zoneId: number,
      location?: Location
    }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.locationForm = this.fb.group({
      name: [this.data.location?.name || '', Validators.required],
      description: [this.data.location?.description || ''],
      latitude: [this.data.location?.ubication?.latitude || 0, Validators.required],
      longitude: [this.data.location?.ubication?.longitude || 0, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.locationForm.invalid) return;

    const { name, description, latitude, longitude } = this.locationForm.value;
    const coordinate = new Coordinate(latitude, longitude);

    if (this.data.location) {
      // Update existing location
      const updatedLocation = new Location(
        this.data.location.id,
        this.data.zoneId,
        name,
        description,
        coordinate
      );

      this.locationService.updateLocation(updatedLocation)
        .subscribe({
          next: (location) => this.dialogRef.close(location),
          error: (error) => console.error('Error updating location:', error)
        });
    } else {
      // Create new location
      this.locationService.createLocation(new Location(0, this.data.zoneId, name, description, coordinate))
        .subscribe({
          next: (location) => this.dialogRef.close(location),
          error: (error) => console.error('Error creating location:', error)
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
