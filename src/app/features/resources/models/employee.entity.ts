import { get } from "lodash";
import { Position } from "./position.entity";

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  status: string;
  positions: Position[];

  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    dni?: string,
    email?: string,
    phone?: string,
    status: string = 'ACTIVE',
    positions: Position[] = []
  ) {
    this.id = id || 0;
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.dni = dni || '';
    this.email = email || '';
    this.phone = phone || '';
    this.status = status || 'ACTIVE';
    this.positions = positions || [];
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get positionNames(): string {
    return this.positions.map(position => position.name).join(', ');
  }
}
