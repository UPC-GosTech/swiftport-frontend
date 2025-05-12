import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ButtonComponent} from '../../../shared/components/button/button.component';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-activities-list',
  imports: [
    ButtonComponent
  ],
  templateUrl: './activities-list.component.html',
  styleUrl: './activities-list.component.scss'
})
export class ActivitiesListComponent {

  constructor(private router: Router) {}

  onActivityDetail() {
    this.router.navigate(['/activity-details']);
  }

  onEjecucion() {
    this.router.navigate(['/execution-history']);
  }

  onReporte() {
    this.router.navigate(['/reports']);
  }

  onRegistro() {
    this.router.navigate(['/task-execution']);
  }
}
