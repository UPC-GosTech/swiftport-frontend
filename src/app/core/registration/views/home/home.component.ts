import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface QuickAction {
  key: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  quickActions: QuickAction[] = [
    { 
      key: 'activities-management',
      icon: 'moving', 
      route: '/swiftport/activity-management'
    },
    { 
      key: 'task-planning',
      icon: 'view_timeline', 
      route: '/swiftport/task-planning'
    },
    { 
      key: 'equipment-management',
      icon: 'construction', 
      route: '/swiftport/equipments-management'
    },
    { 
      key: 'team-management',
      icon: 'group', 
      route: '/swiftport/teams-management'
    },
    { 
      key: 'location-management',
      icon: 'place', 
      route: '/swiftport/location-management'
    },
    { 
      key: 'execution-history',
      icon: 'scoreboard', 
      route: '/swiftport/execution-history'
    }
  ];
}
