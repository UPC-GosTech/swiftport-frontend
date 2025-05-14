import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Team } from '../models/team.entity';
import { TeamResponse } from 'server/models/team.response';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { TeamAssembler } from '../mappers/team.assembler';
import { ZoneService } from './zone.service';
import { TeamMemberService } from './team-member.service';
import { TeamMember } from '../models/team-member.entity';

const teamEndPoint = environment.team;

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService<TeamResponse> {
  constructor(
    private zoneService: ZoneService,
    private teamMemberService: TeamMemberService
  ) {
    super();
    this.resourceEndpoint = teamEndPoint;
  }

  getAllTeams(): Observable<Team[]> {
    return this.getAll().pipe(
      switchMap(teamResponses => {
        // First convert responses to entities
        const teams = teamResponses.map(teamResponse => 
          TeamAssembler.toEntity(teamResponse)
        );
        
        // Then get zones and team members for each team
        return this.zoneService.getAllZones().pipe(
          switchMap(zones => {
            return this.teamMemberService.getAllTeamMembers().pipe(
              map(teamMembers => {
                // Assign zones and team members to each team
                return teams.map((team, index) => {
                  team.zone = zones.find(zone => zone.id === team.zone.id) || team.zone;
                  // Use the memberIds from the response
                  team.members = teamMembers.filter(member => 
                    teamResponses[index].membersId.includes(member.id)
                  );
                  return team;
                });
              })
            );
          })
        );
      })
    );
  }

  getTeamById(id: number): Observable<Team | undefined> {
    return this.getById(id).pipe(
      switchMap(teamResponse => {
        if (!teamResponse) {
          return new Observable<undefined>(subscriber => subscriber.next(undefined));
        }
        
        const team = TeamAssembler.toEntity(teamResponse);
        
        // Get zone and team members for the team
        return this.zoneService.getZoneById(team.zone.id).pipe(
          switchMap(zone => {
            if (zone) {
              team.zone = zone;
            }
            
            return this.teamMemberService.getAllTeamMembers().pipe(
              map(teamMembers => {
                team.members = teamMembers.filter(member => 
                  teamResponse.membersId.includes(member.id)
                );
                return team;
              })
            );
          })
        );
      })
    );
  }

  createTeam(team: Team): Observable<Team> {
    const teamResponse = TeamAssembler.toResponse(team);
    console.log("teamResponse", teamResponse);
    teamResponse.id = this.generateId();
    return this.create(teamResponse).pipe(
      map(createdResponse => {
        team.id = createdResponse.id;
        return team;
      }
      )
    );
  }

  updateTeam(team: Team): Observable<Team> {
    const teamResponse = TeamAssembler.toResponse(team);
    console.log("teamResponse", teamResponse);
    return this.update(teamResponse.id, teamResponse).pipe(
      map(updatedResponse => {
        team.id = updatedResponse.id;
        return team;
      }
      )
    );
  }

  deleteTeam(id: number): Observable<boolean> {
    return this.delete(id);
  }

  updateTeamMembers(teamId: number, members: TeamMember[]): Observable<Team | undefined> {
    return this.getTeamById(teamId).pipe(
      switchMap(team => {
        if (!team) {
          return new Observable<undefined>(subscriber => subscriber.next(undefined));
        }
        team.members = members;
        return this.updateTeam(team);
      })
    );
  }

  toggleTeamStatus(id: number): Observable<Team | undefined> {
    return this.getTeamById(id).pipe(
      switchMap(team => {
        if (!team) {
          return new Observable<undefined>(subscriber => subscriber.next(undefined));
        }
        team.status = team.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        return this.updateTeam(team);
      })
    );
  }
} 