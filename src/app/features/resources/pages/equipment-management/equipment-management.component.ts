import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Equipment } from '../../models/equipment.entity';
import { Columns } from '../../../../shared/components/table/table.models';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SelectorComponent } from '../../../../shared/components/selector/selector.component';
import { FormsModule } from '@angular/forms';
import { EquipmentCardComponent } from '../../components/equipment-card/equipment-card.component';
import { EquipmentFormDialogComponent } from '../../components/equipment-form-dialog/equipment-form-dialog.component';
import { EquipmentListComponent } from '../../components/equipment-list/equipment-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { EquipmentService } from '../../services/equipment.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-equipment-management',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ButtonComponent,
    SelectorComponent,
    FormsModule,
    EquipmentListComponent,
    MatDialogModule,
    TranslatePipe
  ],
  templateUrl: './equipment-management.component.html',
  styleUrl: './equipment-management.component.scss'
})
export class EquipmentManagementComponent implements OnInit {
  // Estado para alternar entre vista de tabla y tarjetas
  viewMode: 'table' | 'cards' = 'table';

  // Filtros
  statusFilter: string = 'all';
  statusOptions: string[] = ['all', 'Disponible', 'Mantenimiento'];

  // Datos de equipamiento (mock)
  equipmentData: Equipment[] = [];
  filteredEquipment: Equipment[] = [];
  loading: boolean = false;

  // Configuración de columnas para la tabla
  columns: Columns[] = [
    {
      header: {
        key: 'plateNumber',
        label: 'Placa',
      },
      cell: 'plateNumber',
      type: 'text',
      sortable: true,
      hide: {
        visible: true,
        label: 'Placa',
      }
    },
    {
      header: {
        key: 'type',
        label: 'Modelo',
      },
      cell: 'type',
      type: 'text',
      sortable: true,
      hide: {
        visible: true,
        label: 'Modelo',
      }
    },
    {
      header: {
        key: 'capacityLoad',
        label: 'Capacidad de Carga',
      },
      cell: 'capacityLoad',
      type: 'text',
      sortable: true,
      hide: {
        visible: true,
        label: 'Capacidad de Carga',
      }
    },
    {
      header: {
        key: 'capacityPassengers',
        label: 'Capacidad de Pasajeros',
      },
      cell: 'capacityPassengers',
      type: 'text',
      sortable: true,
      hide: {
        visible: true,
        label: 'Capacidad de Pasajeros',
      }
    },
    {
      header: {
        key: 'status',
        label: 'Estado',
      },
      cell: 'status',
      type: 'text',
      sortable: true,
      hide: {
        visible: true,
        label: 'Estado',
      }
    },
    {
      header: {
        key: 'actions',
        label: 'Acciones',
      },
      cell: 'actions',
      type: 'template',
      sortable: false,
      hide: {
        visible: true,
        label: 'Acciones',
      }
    }
  ];

  constructor(private dialog: MatDialog, private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.equipmentService.getAllEquipment()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (equipment: Equipment[]) => {
          this.equipmentData = equipment;
          this.applyFilters();
        },
        error: (error: any) => {
          console.error('Error loading equipment:', error);
        }
      });
  }

  // Método para alternar el modo de vista
  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'table' ? 'cards' : 'table';
  }

  // Aplicar filtros
  applyFilters(): void {
    let filtered: Equipment[] = [...this.equipmentData];

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(equipment => equipment.status === this.statusFilter);
    }

    this.filteredEquipment = filtered;
  }

  // Métodos para manejar acciones
  onStatusFilterChange(status: string): void {
    this.statusFilter = status;
    this.applyFilters();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EquipmentFormDialogComponent, {
      width: '500px',
      data: {
        equipment: new Equipment({
          id: 0,
          plateNumber: '',
          type: '',
          capacityLoad: 0,
          capacityPassengers: 0,
          status: 'Disponible'
        }),
        title: 'Agregar equipo'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.equipmentService.createEquipment(result)
          .pipe(
            finalize(() => this.loading = false)
          )
          .subscribe({
            next: (createdEquipment: Equipment) => {
              this.equipmentData.push(createdEquipment);
              this.applyFilters();
            },
            error: (error: any) => {
              console.error('Error creating equipment:', error);
            }
          });
      }
    });
  }

  openEditDialog(equipment: Equipment): void {
    const dialogRef = this.dialog.open(EquipmentFormDialogComponent, {
      width: '500px',
      data: {
        equipment: {...equipment},
        title: 'Editar equipo'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.equipmentService.updateEquipment(result)
          .pipe(
            finalize(() => this.loading = false)
          )
          .subscribe({
            next: (updatedEquipment: Equipment) => {
              const index = this.equipmentData.findIndex(e => e.id === updatedEquipment.id);
              if (index !== -1) {
                this.equipmentData[index] = updatedEquipment;
                this.applyFilters();
              }
            },
            error: (error: any) => {
              console.error('Error updating equipment:', error);
            }
          });
      }
    });
  }

  deleteEquipment(equipment: Equipment): void {
    if (confirm('¿Está seguro de que desea eliminar este equipo?')) {
      this.loading = true;
      this.equipmentService.deleteEquipment(equipment.id)
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe({
          next: () => {
            this.equipmentData = this.equipmentData.filter(e => e.id !== equipment.id);
            this.applyFilters();
          },
          error: (error: any) => {
            console.error('Error deleting equipment:', error);
          }
        });
    }
  }

  uploadPhoto(equipment: Equipment): void {
    // Implementación para subir fotos
    console.log('Subir foto para:', equipment);
  }

  changeStatus(equipment: Equipment, newStatus: string): void {
    const updatedEquipment = { ...equipment, status: newStatus };
    this.loading = true;
    this.equipmentService.updateEquipment(updatedEquipment)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (result: Equipment) => {
          const index = this.equipmentData.findIndex(e => e.id === result.id);
          if (index !== -1) {
            this.equipmentData[index] = result;
            this.applyFilters();
          }
        },
        error: (error: any) => {
          console.error('Error updating equipment status:', error);
        }
      });
  }

  handleStatusChange(event: { equipment: Equipment, newStatus: string }): void {
    this.changeStatus(event.equipment, event.newStatus);
  }

}
