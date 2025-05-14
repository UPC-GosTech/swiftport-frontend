import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Employee } from '../models/employee.entity';
import { Position } from '../models/position.entity';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { EmployeeResponse } from 'server/models/employee.response';
import { EmployeeAssembler } from '../mappers/employee.assembler';
import { PositionService } from './position.service';

const employeeEndPoint = environment.employeeEndPoint;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService<EmployeeResponse> {

  constructor(private positionService: PositionService) {
    super();
    this.resourceEndpoint = employeeEndPoint;
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.getAll().pipe(
      switchMap(employeeResponses => {
        // First convert responses to entities
        const employees = employeeResponses.map(employeeResponse => 
          EmployeeAssembler.toEntity(employeeResponse)
        );
        
        // Then get the positions for each employee
        return this.positionService.getAllPositions().pipe(
          map(positions => {
            console.log(positions);
            // Assign the positions to each employee
            return employees.map(employee => {
              const employeeResponse = employeeResponses.find(er => er.id === employee.id);
              if (employeeResponse) { 
                employee.positions = positions.filter(position => 
                  employeeResponse.positionsId?.includes(position.id) ?? false
                );
              }
              return employee;
            });
          })
        );
      })
    );
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return this.getById(id).pipe(
      switchMap(employeeResponse => {
        if (!employeeResponse) {
          return new Observable<undefined>(subscriber => subscriber.next(undefined));
        }
        
        const employee = EmployeeAssembler.toEntity(employeeResponse);
        
        // Get the positions for the employee
        return this.positionService.getAllPositions().pipe(
          map(positions => {
            employee.positions = positions.filter(position => 
              employeeResponse.positionsId.includes(position.id)
            );
            return employee;
          })
        );
      })
    );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const employeeResponse = EmployeeAssembler.toResponse(employee);
    return this.create(employeeResponse).pipe(
      switchMap(createdResponse => {
        const createdEmployee = EmployeeAssembler.toEntity(createdResponse);
        
        // Get positions for the created employee
        return this.positionService.getAllPositions().pipe(
          map(positions => {
            createdEmployee.positions = positions.filter(position => 
              createdResponse.positionsId.includes(position.id)
            );
            return createdEmployee;
          })
        );
      })
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const employeeResponse = EmployeeAssembler.toResponse(employee);
    return this.update(employeeResponse.id, employeeResponse).pipe(
      switchMap(updatedResponse => {
        const updatedEmployee = EmployeeAssembler.toEntity(updatedResponse);
        
        // Get positions for the updated employee
        return this.positionService.getAllPositions().pipe(
          map(positions => {
            updatedEmployee.positions = positions.filter(position => 
              updatedResponse.positionsId.includes(position.id)
            );
            return updatedEmployee;
          })
        );
      })
    );
  }

  deleteEmployee(id: number): Observable<boolean> {
    return this.delete(id);
  }
}
