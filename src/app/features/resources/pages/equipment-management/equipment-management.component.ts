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
import {TranslatePipe} from '@ngx-translate/core';
import { EquipmentService } from '../../../../shared/services/equipment.service';

@Component({
  selector: 'app-equipment-management',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ButtonComponent,
    SelectorComponent,
    FormsModule,
    EquipmentCardComponent,
    EquipmentFormDialogComponent,
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
  statusFilter: string = 'Todos';
  statusOptions: string[] = ['Todos', 'Disponible', 'Mantenimiento'];

  // Datos de equipamiento (mock)
  equipmentData: Equipment[] = [];
  filteredEquipment: Equipment[] = [];

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
      cell: 'id',
      type: 'template',
      sortable: false
    }
  ];

  constructor(private dialog: MatDialog, private equipmentService: EquipmentService) {}

  getAllEquipments(): void {
    this.equipmentService.getAll().subscribe(
      (response: Equipment[]) => {
        this.equipmentData = response;  // Asignar los equipos obtenidos
        this.applyFilters();  // Aplicar filtros si es necesario
      },
      (error) => {
        console.error('Error al obtener los equipos:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getAllEquipments();
    this.applyFilters();
  }

  // Método para alternar el modo de vista
  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'table' ? 'cards' : 'table';
  }

  // Aplicar filtros
  applyFilters(): void {
    this.filteredEquipment = this.equipmentData.filter(equip => {
      if (this.statusFilter === 'Todos') {
        return true;
      }
      return equip.status === this.statusFilter;
    });
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
        equipment: new Equipment({}),
        title: 'Agregar equipamiento'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEquipment(result);
      }
    });
  }

  openEditDialog(equipment: Equipment): void {
    const dialogRef = this.dialog.open(EquipmentFormDialogComponent, {
      width: '500px',
      data: {
        equipment: { ...equipment },
        title: 'Editar equipamiento'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEquipment(result);
      }
    });
  }

  saveEquipment(equipment: Equipment): void {
    this.equipmentService.addEquipment(equipment).subscribe(
      (savedEquipment) => {
        this.equipmentData.push(savedEquipment);
        this.applyFilters();
        this.getAllEquipments();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  changeStatus(equipment: Equipment, newStatus: string): void {
    const index = this.equipmentData.findIndex(e => e.id === equipment.id);
    if (index !== -1) {
      this.equipmentData[index].status = newStatus;
      this.applyFilters();
    }
  }

  handleStatusChange(event: { equipment: Equipment, newStatus: string }): void {
    this.changeStatus(event.equipment, event.newStatus);
  }

  uploadPhoto(equipment: Equipment): void {
    // Implementación para subir fotos
    console.log('Subir foto para:', equipment);
  }
}
