import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.entity';
import { Position } from '../models/position.entity';
import {environment} from '../../../../environments/environment';
import {BaseService} from '../../../shared/services/base.service';
import {Equipment} from '../models/equipment.entity';

const employeeEndPoint = environment.employeeEndPoint;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService<Employee> {

  constructor() {
    super();
    this.resourceEndpoint = employeeEndPoint;
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.getAll();
  }

  /*getActiveEmployees(): Observable<Employee[]> {
    return of(this.employee.filter(employee => employee.status === 'ACTIVE'));
  }*/

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return this.getById(id);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.create(employee);
  }

  deleteEmployee(id: number): Observable<boolean> {
    return this.delete(id);
  }
}
