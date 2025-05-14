import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { DateNavigatorComponent } from '../../../../shared/components/date-navigator/date-navigator.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TeamCardComponent } from '../../components/team-card/team-card.component';
import { TeamFormDialogComponent } from '../../components/team-form-dialog/team-form-dialog.component';
import { TeamService } from '../../services/team.service';
import { ZoneService } from '../../services/zone.service';
import { EmployeeService } from '../../services/employee.service';
import { Team } from '../../models/team.entity';
import { Zone } from '../../models/zone.entity';
import { TeamMember } from '../../models/team-member.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    FormsModule,
    DateNavigatorComponent,
    ButtonComponent,
    TeamCardComponent,
    TranslatePipe
  ],
  templateUrl: './team-management.component.html',
  styleUrl: './team-management.component.scss'
})
export class TeamManagementComponent implements OnInit {
  teams: Team[] = [];
  zones: Zone[] = [];
  filteredTeams: Team[] = [];
  selectedDate: Date = new Date();
  selectedZoneId: number | null = null;

  constructor(
    private teamService: TeamService,
    private zoneService: ZoneService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadZones();
    this.loadTeams();
  }

  loadZones(): void {
    this.zoneService.getAllZones().subscribe((zones: Zone[]) => {
      this.zones = zones;
    });
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
      this.applyFilters();
    });
  }

  onDateChange(date: Date): void {
    this.selectedDate = date;
    this.applyFilters();
  }

  onZoneFilterChange(): void {
    this.applyFilters();
  }

  clearZoneFilter(): void {
    this.selectedZoneId = null;
    this.applyFilters();
  }

  applyFilters(): void {
    // Start with all teams and then apply filters
    let filtered = [...this.teams];

    // Filter by date
    filtered = filtered.filter(team => {
      const teamDate = new Date(team.date);
      return teamDate.toDateString() === this.selectedDate.toDateString();
    });

    // Filter by zone if selected
    if (this.selectedZoneId) {
      filtered = filtered.filter(team => team.zone.id === this.selectedZoneId);
    }

    this.filteredTeams = filtered;
  }

  openCreateTeamDialog(): void {
    const dialogRef = this.dialog.open(TeamFormDialogComponent, {
      width: '700px',
      data: {
        title: 'Crear Equipo',
        team: null,
        selectedDate: this.selectedDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createTeam(result);
      }
    });
  }

  createTeam(team: Team): void {

  }

  openEditTeamDialog(team: Team): void {
    const dialogRef = this.dialog.open(TeamFormDialogComponent, {
      width: '700px',
      data: {
        title: 'Editar Equipo',
        team: team,
        selectedDate: team.date
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTeam(result);
      }
    });
  }

  updateTeam(team: Team): void {
    this.teamService.updateTeam(team).subscribe(updatedTeam => {
      if (updatedTeam) {
        const index = this.teams.findIndex(t => t.id === updatedTeam.id);
        if (index !== -1) {
          this.teams[index] = updatedTeam;
          this.applyFilters();
        }
      }
    });
  }

  openEditMembersDialog(team: Team): void {
    const dialogRef = this.dialog.open(TeamFormDialogComponent, {
      width: '700px',
      data: {
        title: 'Editar Miembros del Equipo',
        team: team,
        selectedDate: team.date
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTeamMembers(result);
      }
    });
  }

  updateTeamMembers(team: Team): void {
    this.teamService.updateTeamMembers(team.id, team.members).subscribe(updatedTeam => {
      if (updatedTeam) {
        const index = this.teams.findIndex(t => t.id === updatedTeam.id);
        if (index !== -1) {
          this.teams[index] = updatedTeam;
          this.applyFilters();
        }
      }
    });
  }

  toggleTeamStatus(team: Team): void {
    this.teamService.toggleTeamStatus(team.id).subscribe(updatedTeam => {
      if (updatedTeam) {
        const index = this.teams.findIndex(t => t.id === updatedTeam.id);
        if (index !== -1) {
          this.teams[index] = updatedTeam;
          this.applyFilters();
        }
      }
    });
  }

  getFormattedDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
