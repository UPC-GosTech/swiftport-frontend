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
  positions: Position[] = [];

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
      header: { key: 'fullName', label: 'Nombre' },
      cell: 'fullName',
      type: 'text',
      sortable: true,
      hide: { visible: true, label: 'Nombre' }
    },
    {
      header: { key: 'positionNames', label: 'Cargo' },
      cell: 'positionNames',
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

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Simulate getting positions
    this.positions = [
      new Position(1, 'Conductor', 'Conductor de vehículos'),
      new Position(2, 'Operador', 'Operador de maquinaria'),
      new Position(3, 'Supervisor', 'Supervisor de obra'),
      new Position(4, 'Técnico', 'Técnico especializado')
    ];

    // Set position filter options
    this.positionOptions = ['all', ...this.positions.map(p => p.name)];

    // Simulate getting employees
    this.employeeData = [
      new Employee(
        1,
        'Juan',
        'Pérez',
        '45678912',
        'juan.perez@example.com',
        '987654321',
        'ACTIVE',
        [this.positions[0]]
      ),
      new Employee(
        2,
        'María',
        'García',
        '12345678',
        'maria.garcia@example.com',
        '123456789',
        'ACTIVE',
        [this.positions[1]]
      ),
      new Employee(
        3,
        'Carlos',
        'López',
        '87654321',
        'carlos.lopez@example.com',
        '456789123',
        'ACTIVE',
        [this.positions[2]]
      ),
      new Employee(
        4,
        'Ana',
        'Martínez',
        '56789123',
        'ana.martinez@example.com',
        '321654987',
        'ACTIVE',
        [this.positions[0], this.positions[3]]
      )
    ];

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
    if (confirm(`¿Estás seguro de eliminar a ${employee.fullName}?`)) {
      const index = this.employeeData.findIndex(e => e.id === employee.id);
      if (index !== -1) {
        this.employeeData.splice(index, 1);
        this.applyFilters();
      }
    }
  }
}
