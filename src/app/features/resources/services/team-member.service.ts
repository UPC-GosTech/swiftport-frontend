import { Injectable } from '@angular/core';
import { Observable, map, switchMap, forkJoin } from 'rxjs';
import { TeamMember } from '../models/team-member.entity';
import { TeamMemberResponse } from 'server/models/team-member.response';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { TeamMemberAssembler } from '../mappers/team-member.assembler';
import { EmployeeService } from './employee.service';
import { PositionService } from './position.service';

const teamMemberEndPoint = environment.teamMemberEndPoint;

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService extends BaseService<TeamMemberResponse> {
  constructor(
    private employeeService: EmployeeService,
    private positionService: PositionService
  ) {
    super();
    this.resourceEndpoint = teamMemberEndPoint;
  }

  private enrichTeamMemberWithRelatedData(teamMember: TeamMember, employees: any[], positions: any[]): TeamMember {
    const employee = employees.find(emp => emp.id === teamMember.employee.id);
    const position = positions.find(pos => pos.id === teamMember.position.id);
    
    if (employee) {
      teamMember.employee = employee;
    }
    if (position) {
      teamMember.position = position;
    }
    
    return teamMember;
  }

  getAllTeamMembers(): Observable<TeamMember[]> {
    return this.getAll().pipe(
      switchMap(teamMemberResponses => {
        // First convert responses to entities
        const teamMembers = teamMemberResponses.map(response => 
          TeamMemberAssembler.toEntity(response)
        );

        // Load all employees and positions in parallel
        return forkJoin({
          employees: this.employeeService.getAllEmployees(),
          positions: this.positionService.getAllPositions()
        }).pipe(
          map(({ employees, positions }) => 
            // Enrich team members with employee and position data
            teamMembers.map(teamMember => 
              this.enrichTeamMemberWithRelatedData(teamMember, employees, positions)
            )
          )
        );
      })
    );
  }

  getTeamMemberById(id: number): Observable<TeamMember | undefined> {
    return this.getById(id).pipe(
      switchMap(teamMemberResponse => {
        if (!teamMemberResponse) {
          return new Observable<undefined>(subscriber => subscriber.next(undefined));
        }

        const teamMember = TeamMemberAssembler.toEntity(teamMemberResponse);

        // Load employee and position data in parallel
        return forkJoin({
          employee: this.employeeService.getEmployeeById(teamMember.employee.id),
          position: this.positionService.getPositionById(teamMember.position.id)
        }).pipe(
          map(({ employee, position }) => {
            if (employee) {
              teamMember.employee = employee;
            }
            if (position) {
              teamMember.position = position;
            }
            return teamMember;
          })
        );
      })
    );
  }

  createTeamMember(teamMember: TeamMember): Observable<number> {
    const teamMemberResponse = TeamMemberAssembler.toResponse(teamMember);
    const generatedId = this.generateId();
    teamMemberResponse.id = generatedId;
    return this.create(teamMemberResponse).pipe(
      map(() => generatedId)
    );
  }

  updateTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    const teamMemberResponse = TeamMemberAssembler.toResponse(teamMember);
    return this.update(teamMemberResponse.id, teamMemberResponse).pipe(
      map(updatedResponse => TeamMemberAssembler.toEntity(updatedResponse))
    );
  }

  deleteTeamMember(id: number): Observable<boolean> {
    return this.delete(id);
  }
}
