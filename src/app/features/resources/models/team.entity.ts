import { TeamMember } from "./team-member.entity";
import { Zone } from "./zone.entity";
export class Team {
    id: number;
    name: string;
    date: Date;
    zone: Zone;
    status: string;
    members: TeamMember[];
constructor(
    id: number,
    name: string,
    date: Date,
    zone: Zone,
    status: string,
    members: TeamMember[]
) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.zone = zone;
    this.status = status;
    this.members = members;
}
}
