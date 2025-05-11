import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ButtonComponent} from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-home-admin',
  imports: [
    ButtonComponent
  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {

  constructor(private router: Router) {}

  onSettings() {
    this.router.navigate(['/company-settings']);
  }

  onActivities() {
    this.router.navigate(['/activities-list']);
  }
}
