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
import { TranslatePipe } from "@ngx-translate/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

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
        ButtonComponent,
        TranslatePipe,
        ConfirmDialogComponent
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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadZones();
  }

  loadZones(): void {
    this.loading = true;
    this.zoneService.getAllZones().subscribe({
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
    let zone = this.zones.find(z => z.id === id);
    if (zone) {
      zone.active = !zone.active;
      this.zoneService.updateZone(zone).subscribe({
        next: () => this.loadZones(),
        error: (error) => console.error('Error toggling zone active state:', error)
      });
    }
  }

  deleteZone(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Zona',
        message: '¿Estás seguro de que deseas eliminar esta zona? Esta acción no se puede deshacer.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.zoneService.deleteZone(id).subscribe({
          next: (success) => {
            if (success) {
              this.loadZones();
              this.snackBar.open('Zona eliminada con éxito', 'Cerrar', {
                duration: 3000
              });
            }
          },
          error: (error) => {
            console.error('Error deleting zone:', error);
            this.snackBar.open('Error al eliminar la zona', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }
}
