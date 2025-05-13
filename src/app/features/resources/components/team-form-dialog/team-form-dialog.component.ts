import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Team } from '../../models/team.entity';
import { Zone } from '../../models/zone.entity';
import { Location } from '../../models/location.entity';
import { Employee } from '../../models/employee.entity';
import { Position } from '../../models/position.entity';
import { TeamMember } from '../../models/team-member.entity';
import { ZoneService } from '../../services/zone.service';
import { EmployeeService } from '../../services/employee.service';
import { Observable, forkJoin } from 'rxjs';

export interface TeamDialogData {
  team?: Team;
  title: string;
  selectedDate: Date;
}

@Component({
  selector: 'app-team-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    ButtonComponent
  ],
  templateUrl: './team-form-dialog.component.html',
  styleUrl: './team-form-dialog.component.scss'
})
export class TeamFormDialogComponent implements OnInit {
  teamForm!: FormGroup;
  zones: Zone[] = [];
  employees: Employee[] = [];
  positions: Position[] = [];
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  isEditMode = false;
  teamMembers: FormArray;
  selectedDate: Date;

  constructor(
    private fb: FormBuilder,
    private zoneService: ZoneService,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<TeamFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamDialogData
  ) {
    this.teamMembers = this.fb.array([]);
    this.selectedDate = data.selectedDate;
  }

  ngOnInit(): void {
    this.loadData();
    this.initForm();
  }

  loadData(): void {
    forkJoin({
      zones: this.zoneService.getAllZones(),
      employees: this.employeeService.getAllEmployees()
    }).subscribe(result => {
      this.zones = result.zones;
      this.employees = result.employees;

      // Extract locations from all zones
      this.zones.forEach(zone => {
        if (zone.locations && zone.locations.length > 0) {
          this.locations = [...this.locations, ...zone.locations];
        }
      });

      // Extract available positions from employees
      const positionSet = new Set<string>();
      this.employees.forEach(employee => {
        employee.positions.forEach(position => {
          positionSet.add(JSON.stringify(position));
        });
      });

      this.positions = Array.from(positionSet).map(p => JSON.parse(p));

      // If editing, populate the team members and update filtered locations
      if (this.data.team) {
        this.teamMembers.clear();
        this.data.team.members.forEach(member => {
          this.teamMembers.push(this.createMemberFormGroup(member));
        });

        // Set initial filtered locations
        if (this.data.team.zone) {
          this.onZoneChange(this.data.team.zone.id);
        }
      }
    });
  }

  initForm(): void {
    this.isEditMode = !!this.data.team;

    this.teamForm = this.fb.group({
      name: [this.data.team?.name || '', Validators.required],
      zoneId: [this.data.team?.zone?.id || '', Validators.required],
      locationId: [this.data.team?.zone?.locations?.[0]?.id || '', Validators.required],
      teamMembers: this.teamMembers
    });

    // Add zone change listener
    this.teamForm.get('zoneId')?.valueChanges.subscribe(zoneId => {
      this.onZoneChange(zoneId);
    });
  }

  onZoneChange(zoneId: number): void {
    // Reset location control
    this.teamForm.get('locationId')?.setValue('');

    // Filter locations by selected zone
    this.filteredLocations = this.locations.filter(location => location.zoneId === zoneId);

    // If there's only one location, select it automatically
    if (this.filteredLocations.length === 1) {
      this.teamForm.get('locationId')?.setValue(this.filteredLocations[0].id);
    }
  }

  createMemberFormGroup(member?: TeamMember): FormGroup {
    return this.fb.group({
      id: [member?.id || 0],
      employeeId: [member?.employee.id || '', Validators.required],
      positionId: [member?.position.id || '', Validators.required]
    });
  }

  addTeamMember(): void {
    this.teamMembers.push(this.createMemberFormGroup());
  }

  removeTeamMember(index: number): void {
    this.teamMembers.removeAt(index);
  }

  getEmployeeNameById(id: number): string {
    const employee = this.employees.find(e => e.id === id);
    return employee ? employee.fullName : '';
  }

  getPositionNameById(id: number): string {
    const position = this.positions.find(p => p.id === id);
    return position ? position.name : '';
  }

  getAvailablePositionsForEmployee(employeeId: number): Position[] {
    const employee = this.employees.find(e => e.id === employeeId);
    return employee ? employee.positions : [];
  }

  formatDate(date: Date): string {
    if (!date) return '';

    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  onSubmit(): void {
    if (this.teamForm.invalid) {
      this.markFormGroupTouched(this.teamForm);
      return;
    }

    const formValues = this.teamForm.value;
    const selectedZone = this.zones.find(z => z.id === formValues.zoneId)!;
    const selectedLocation = this.locations.find(l => l.id === formValues.locationId);

    // Update zone with selected location if available
    let zoneWithLocation = {...selectedZone};
    if (selectedLocation) {
      zoneWithLocation.locations = [selectedLocation];
    }

    // Create TeamMember objects
    const teamMembers: TeamMember[] = formValues.teamMembers.map((member: any) => {
      const employee = this.employees.find(e => e.id === member.employeeId)!;
      const position = this.positions.find(p => p.id === member.positionId)!;
      return new TeamMember(member.id || 0, employee, position);
    });

    // Create the Team object with the date from DateNavigator
    const team: Team = this.data.team ?
      new Team(
        this.data.team.id,
        formValues.name,
        this.selectedDate,
        zoneWithLocation,
        this.data.team.status,
        teamMembers
      ) :
      new Team(
        0, // ID will be assigned by the service
        formValues.name,
        this.selectedDate,
        zoneWithLocation,
        'ACTIVE',
        teamMembers
      );

    this.dialogRef.close(team);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if ((control as FormGroup)?.controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
