import { Employee } from "./employee.entity";
import { Position } from "./position.entity";

export class TeamMember {
    id: number;
    employee: Employee;
    position: Position;
    constructor(
        id: number,
        employee: Employee,
        position: Position
    ) {
        this.id = id;
        this.employee = employee;
        this.position = position;
    }
}
