import { Team } from "../models/team.entity";
import { TeamResponse } from "server/models/team.response";
import { TeamMember } from "../models/team-member.entity";
import { Zone } from "../models/zone.entity";

export class TeamAssembler {
  static toResponse(team: Team): TeamResponse {
    return {
      id: team.id,
      name: team.name,
      date: team.date.toISOString(),
      zoneId: team.zone.id,
      status: team.status as 'Activo' | 'Inactivo',
      membersId: team.members.map(m => m.id)
    }
  }

  static toEntity(dto: TeamResponse, members: TeamMember[] = []): Team {
    return new Team(
      dto.id,
      dto.name,
      new Date(dto.date),
      new Zone(dto.zoneId),
      dto.status,
      members
    );
  }
}
