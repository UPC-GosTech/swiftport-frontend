import { Employee } from "../models/employee.entity";
import { Position } from "../models/position.entity";
import { TeamMember } from "../models/team-member.entity";
import { TeamMemberResponse } from "server/models/team-member.response";

export class TeamMemberAssembler {
  static toResponse(teamMember: TeamMember): TeamMemberResponse {
    return {
      id: teamMember.id,
      employeeId: teamMember.employee.id,
      positionId: teamMember.position.id
    }
  }

  static toEntity(dto: TeamMemberResponse): TeamMember {
    return new TeamMember(
      dto.id,
      new Employee(dto.employeeId),
      new Position(dto.positionId)
    );
  }
}
