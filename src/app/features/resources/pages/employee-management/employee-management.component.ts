import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Employee } from '../../models/employee.entity';
import { Position } from '../../models/position.entity';
import { Columns } from '../../../../shared/components/table/table.models';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SelectorComponent } from '../../../../shared/components/selector/selector.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeFormDialogComponent } from '../../components/employee-form-dialog/employee-form-dialog.component';
import {TranslatePipe} from '@ngx-translate/core';
import {EquipmentService} from '../../../../shared/services/equipment.service';
import {EmployeeService} from '../../services/employee.service';
import {Equipment} from '../../models/equipment.entity';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ButtonComponent,
    SelectorComponent,
    FormsModule,
    MatDialogModule,
    TranslatePipe
  ],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss'
})
export class EmployeeManagementComponent implements OnInit {
  // Data sources
  employeeData: Employee[] = [];
  filteredEmployees: Employee[] = [];
  positions: Position[] = [
    {
      "id": 1,
      "name": "Admin",
      "description": "In charge of the company"
    },
    {
      "id": 2,
      "name": "Operario",
      "description": "Executes the tasks"
    }
  ];

  // Filter options
  positionFilter: string = 'all';
  positionOptions: string[] = ['all'];

  // Table configuration
  columns: Columns[] = [
    {
      header: { key: 'dni', label: 'DNI' },
      cell: 'dni',
      type: 'text',
      sortable: true,
      hide: { visible: true, label: 'DNI' }
    },
    {
      header: { key: 'fullName', label: 'Apellido' },
      cell: 'lastName',
      type: 'text',
      sortable: true,
      hide: { visible: true, label: 'Nombre' }
    },
    {
      header: { key: 'positionNames', label: 'Cargo' },
      cell: 'positions[0].name',
      type: 'text',
      sortable: true,
      hide: { visible: true, label: 'Cargo' }
    },
    {
      header: { key: 'actions', label: 'Acciones' },
      cell: 'actions',
      type: 'template',
      sortable: false,
      hide: { visible: true, label: 'Acciones' }
    }
  ];

  constructor(private dialog: MatDialog, private employeeService: EmployeeService) {}

  getAllEmployees(): void {
    this.employeeService.getAll().subscribe(
      (response: Employee[]) => {
        this.employeeData = response;  // Asignar los equipos obtenidos
        this.applyFilters();  // Aplicar filtros si es necesario
      },
      (error) => {
        console.error( error);
      }
    );
  }

  ngOnInit(): void {
    this.getAllEmployees();
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered : Employee[] = [...this.employeeData];

    // Apply position filter
    if (this.positionFilter !== 'all') {
      filtered = filtered.filter(employee =>
        employee.positions.some(position => position.name === this.positionFilter)
      );
    }

    // Process data for display
    this.filteredEmployees = filtered;
  }

  onPositionFilterChange(position: string): void {
    this.positionFilter = position;
    this.applyFilters();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: '500px',
      data: {
        employee: new Employee(0, '', '', '', '', '', 'ACTIVE', []),
        title: 'Agregar empleado',
        positions: this.positions
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Generate a new ID (this would be handled by the backend in a real app)
        const newId = Math.max(...this.employeeData.map(e => e.id), 0) + 1;
        result.id = newId;

        this.employeeData.push(result);
        this.applyFilters();
      }
    });
  }

  openEditDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: '500px',
      data: {
        employee: {...employee},
        title: 'Editar empleado',
        positions: this.positions
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.employeeData.findIndex(e => e.id === result.id);
        if (index !== -1) {
          this.employeeData[index] = result;
          this.applyFilters();
        }
      }
    });
  }

  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee.id).subscribe(
      () => {
        this.employeeData = this.employeeData.filter(e => e.id !== employee.id);
        this.applyFilters();  // Aplicar los filtros para actualizar la vista
      },
      (error) => {
        console.error('Error al eliminar el equipo:', error);
      }
    );
  }
}
