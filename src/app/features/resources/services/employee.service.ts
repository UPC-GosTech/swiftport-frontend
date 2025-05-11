import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.entity';
import { Position } from '../models/position.entity';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Simulated data storage - Replace with API calls in production
  private employees: Employee[] = [
    new Employee(1, 'Juan', 'Pérez', '12345678', 'juan@example.com', '123456789', 'ACTIVE', [
      new Position(1, 'Supervisor', 'Supervisión de operaciones')
    ]),
    new Employee(2, 'María', 'López', '87654321', 'maria@example.com', '987654321', 'ACTIVE', [
      new Position(2, 'Técnico', 'Mantenimiento técnico')
    ]),
    new Employee(3, 'Carlos', 'Rodríguez', '45678912', 'carlos@example.com', '456789123', 'ACTIVE', [
      new Position(3, 'Operador', 'Operación de equipos')
    ]),
    new Employee(4, 'Ana', 'Martínez', '78912345', 'ana@example.com', '789123456', 'ACTIVE', [
      new Position(4, 'Asistente', 'Asistencia administrativa')
    ]),
    new Employee(5, 'Pedro', 'González', '56789123', 'pedro@example.com', '567891234', 'INACTIVE', [
      new Position(5, 'Seguridad', 'Control de seguridad')
    ])
  ];

  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  getActiveEmployees(): Observable<Employee[]> {
    return of(this.employees.filter(employee => employee.status === 'ACTIVE'));
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return of(this.employees.find(employee => employee.id === id));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const newId = Math.max(...this.employees.map(e => e.id), 0) + 1;
    employee.id = newId;
    this.employees.push(employee);
    return of(employee);
  }

  updateEmployee(employee: Employee): Observable<Employee | undefined> {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      return of(this.employees[index]);
    }
    return of(undefined);
  }

  toggleEmployeeStatus(id: number): Observable<Employee | undefined> {
    const index = this.employees.findIndex(e => e.id === id);
    if (index !== -1) {
      this.employees[index].status = this.employees[index].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      return of(this.employees[index]);
    }
    return of(undefined);
  }

  deleteEmployee(id: number): Observable<boolean> {
    const initialLength = this.employees.length;
    this.employees = this.employees.filter(e => e.id !== id);
    return of(initialLength !== this.employees.length);
  }
} 