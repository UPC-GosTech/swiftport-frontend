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

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Inicializar con datos de prueba
    this.equipmentData = [
      {
        id: 1,
        plateNumber: 'ABC-123',
        type: 'Excavadora',
        capacityLoad: 1500,
        capacityPassengers: 2,
        status: 'Disponible'
      },
      {
        id: 2,
        plateNumber: 'XYZ-789',
        type: 'Bulldozer',
        capacityLoad: 2500,
        capacityPassengers: 1,
        status: 'Mantenimiento'
      },
      {
        id: 3,
        plateNumber: 'DEF-456',
        type: 'Camión Volquete',
        capacityLoad: 5000,
        capacityPassengers: 3,
        status: 'Disponible'
      }
    ];

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
        equipment: new Equipment(),
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
    if (equipment.id === 0) {
      // Agregar nuevo equipo
      const newId = Math.max(...this.equipmentData.map(e => e.id), 0) + 1;
      equipment.id = newId;
      this.equipmentData.push(equipment);
    } else {
      // Actualizar equipo existente
      const index = this.equipmentData.findIndex(e => e.id === equipment.id);
      if (index !== -1) {
        this.equipmentData[index] = equipment;
      }
    }

    this.applyFilters();
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
