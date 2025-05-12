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
    if (id !== undefined && firstName !== undefined && lastName !== undefined) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.dni = dni || '';
      this.email = email || '';
      this.phone = phone || '';
      this.status = status;
      this.positions = positions;
    } else {
      this.id = 0;
      this.firstName = '';
      this.lastName = '';
      this.dni = '';
      this.email = '';
      this.phone = '';
      this.status = 'ACTIVE';
      this.positions = [];
    }
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get positionNames(): string {
    return this.positions.map(position => position.name).join(', ');
  }
}
