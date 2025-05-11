import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ZoneService } from '../../services/zone.service';
import { Zone } from '../../models/zone.entity';
import { ZoneCardComponent } from '../../components/zone-card/zone-card.component';
import { ZoneFormDialogComponent } from '../../components/zone-form-dialog/zone-form-dialog.component';
import { LocationFormDialogComponent } from '../../components/location-form-dialog/location-form-dialog.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-location-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ZoneCardComponent,
    ZoneFormDialogComponent,
    LocationFormDialogComponent,
    ButtonComponent
  ],
  templateUrl: './location-management.component.html',
  styleUrl: './location-management.component.scss'
})
export class LocationManagementComponent implements OnInit {
  zones: Zone[] = [];
  loading = true;
  selectedZoneId: number | null = null;

  constructor(
    private zoneService: ZoneService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadZones();
  }

  loadZones(): void {
    this.loading = true;
    this.zoneService.getZones().subscribe({
      next: (zones) => {
        this.zones = zones;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading zones:', error);
        this.loading = false;
      }
    });
  }

  openZoneFormDialog(zone?: Zone): void {
    const dialogRef = this.dialog.open(ZoneFormDialogComponent, {
      width: '500px',
      data: { zone }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadZones();
      }
    });
  }

  openLocationFormDialog(zoneId: number): void {
    const dialogRef = this.dialog.open(LocationFormDialogComponent, {
      width: '500px',
      data: { zoneId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadZones();
      }
    });
  }

  selectZone(zoneId: number): void {
    if (this.selectedZoneId === zoneId) {
      this.selectedZoneId = null;
    } else {
      this.selectedZoneId = zoneId;
    }
  }

  toggleZoneActive(id: number): void {
    this.zoneService.toggleZoneActive(id).subscribe({
      next: () => this.loadZones(),
      error: (error) => console.error('Error toggling zone active state:', error)
    });
  }
}
