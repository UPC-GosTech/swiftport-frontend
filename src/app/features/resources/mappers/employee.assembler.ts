import { Employee } from "../models/employee.entity";
import { EmployeeResponse } from "server/models/employee.response";
import { Position } from "../models/position.entity";

export class EmployeeAssembler {
  static toResponse(employee: Employee): EmployeeResponse {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      dni: employee.dni,
      email: employee.email,
      phone: employee.phone,
      status: employee.status as 'ACTIVE' | 'INACTIVE',
      positionsId: employee.positions.map(p => p.id)
    }
  }

  static toEntity(dto: EmployeeResponse, positions: Position[] = []): Employee {
    return new Employee(
      dto.id,
      dto.firstName,
      dto.lastName,
      dto.dni,
      dto.email,
      dto.phone,
      dto.status,
      positions
    );
  }
}
