import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team } from '../models/team.entity';
import { Zone } from '../models/zone.entity';
import { Employee } from '../models/employee.entity';
import { TeamMember } from '../models/team-member.entity';
import { Position } from '../models/position.entity';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  // Simulated data storage - Replace with API calls in production
  private teams: Team[] = [
    new Team(1, 'Alpha Team', new Date(), new Zone(1, 'Terminal A', 'Terminal principal de pasajeros', []), 'ACTIVE', []),
    new Team(2, 'Bravo Team', new Date(), new Zone(2, 'Terminal B', 'Terminal internacional', []), 'ACTIVE', []),
    new Team(3, 'Charlie Team', new Date(), new Zone(3, 'Área de Carga', 'Manejo y almacenamiento de carga', []), 'INACTIVE', [])
  ];

  constructor() {
    // Initialize with some team members for testing
    this.teams[0].members = [
      new TeamMember(1, 
        new Employee(1, 'Juan', 'Pérez', '12345678', 'juan@example.com', '123456789'),
        new Position(1, 'Supervisor', 'Supervisión de operaciones')
      ),
      new TeamMember(2,
        new Employee(2, 'María', 'López', '87654321', 'maria@example.com', '987654321'),
        new Position(2, 'Técnico', 'Mantenimiento técnico')
      )
    ];
    
    this.teams[1].members = [
      new TeamMember(3,
        new Employee(3, 'Carlos', 'Rodríguez', '45678912', 'carlos@example.com', '456789123'),
        new Position(3, 'Operador', 'Operación de equipos')
      ),
      new TeamMember(4,
        new Employee(4, 'Ana', 'Martínez', '78912345', 'ana@example.com', '789123456'),
        new Position(4, 'Asistente', 'Asistencia administrativa')
      )
    ];
  }

  getTeams(): Observable<Team[]> {
    return of(this.teams);
  }

  getTeamsByDate(date: Date): Observable<Team[]> {
    // Filter teams by the specified date (based on the date property)
    const filteredTeams = this.teams.filter(team => 
      team.date.getFullYear() === date.getFullYear() &&
      team.date.getMonth() === date.getMonth() &&
      team.date.getDate() === date.getDate()
    );
    return of(filteredTeams);
  }

  getTeamsByZone(zoneId: number): Observable<Team[]> {
    return of(this.teams.filter(team => team.zone.id === zoneId));
  }

  getTeamById(id: number): Observable<Team | undefined> {
    return of(this.teams.find(team => team.id === id));
  }

  createTeam(name: string, date: Date, zone: Zone, members: TeamMember[]): Observable<Team> {
    const newId = Math.max(...this.teams.map(t => t.id), 0) + 1;
    const newTeam = new Team(newId, name, date, zone, 'ACTIVE', members);
    this.teams.push(newTeam);
    return of(newTeam);
  }

  updateTeam(team: Team): Observable<Team | undefined> {
    const index = this.teams.findIndex(t => t.id === team.id);
    if (index !== -1) {
      this.teams[index] = team;
      return of(this.teams[index]);
    }
    return of(undefined);
  }

  updateTeamMembers(teamId: number, members: TeamMember[]): Observable<Team | undefined> {
    const index = this.teams.findIndex(t => t.id === teamId);
    if (index !== -1) {
      this.teams[index].members = members;
      return of(this.teams[index]);
    }
    return of(undefined);
  }

  toggleTeamStatus(id: number): Observable<Team | undefined> {
    const index = this.teams.findIndex(t => t.id === id);
    if (index !== -1) {
      this.teams[index].status = this.teams[index].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      return of(this.teams[index]);
    }
    return of(undefined);
  }

  deleteTeam(id: number): Observable<boolean> {
    const initialLength = this.teams.length;
    this.teams = this.teams.filter(t => t.id !== id);
    return of(initialLength !== this.teams.length);
  }
} 