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
import { TranslatePipe } from '@ngx-translate/core';
import { EmployeeService } from '../../services/employee.service';
import { PositionService } from '../../services/position.service';
import { finalize } from 'rxjs/operators';

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
  loading: boolean = false;

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

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.positionService.getAllPositions()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (positions) => {
          this.positions = positions;
          this.positionOptions = ['all', ...positions.map(p => p.name)];
          this.getAllEmployees();
        },
        error: (error) => {
          console.error('Error loading positions:', error);
        }
      });
  }

  getAllEmployees(): void {
    this.loading = true;
    this.employeeService.getAllEmployees()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (employees) => {
          this.employeeData = employees;
          this.applyFilters();
        },
        error: (error) => {
          console.error('Error loading employees:', error);
        }
      });
  }

  applyFilters(): void {
    let filtered: Employee[] = [...this.employeeData];

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
        this.loading = true;
        this.employeeService.createEmployee(result)
          .pipe(
            finalize(() => this.loading = false)
          )
          .subscribe({
            next: (createdEmployee) => {
              this.employeeData.push(createdEmployee);
              this.applyFilters();
            },
            error: (error) => {
              console.error('Error creating employee:', error);
            }
          });
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
        this.loading = true;
        this.employeeService.updateEmployee(result)
          .pipe(
            finalize(() => this.loading = false)
          )
          .subscribe({
            next: (updatedEmployee) => {
              const index = this.employeeData.findIndex(e => e.id === updatedEmployee.id);
              if (index !== -1) {
                this.employeeData[index] = updatedEmployee;
                this.applyFilters();
              }
            },
            error: (error) => {
              console.error('Error updating employee:', error);
            }
          });
      }
    });
  }

  deleteEmployee(employee: Employee): void {
    if (confirm('¿Está seguro de que desea eliminar este empleado?')) {
      this.loading = true;
      this.employeeService.deleteEmployee(employee.id)
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe({
          next: () => {
            this.employeeData = this.employeeData.filter(e => e.id !== employee.id);
            this.applyFilters();
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
          }
        });
    }
  }
}
