import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SidebarMenuItem } from '../components/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private adminMenuItems: SidebarMenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      route: '/swiftport/home',
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/swiftport/dashboard'
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'groups',
      route: '/swiftport/users'
    },
    {
      id: 'management',
      label: 'Management',
      icon: 'computer',
      children: [
        {
          id: 'equipments-management',
          label: 'Equipment Management',
          icon: 'construction',
          route: '/swiftport/equipments-management'
        },
        {
          id: 'employee-management',
          label: 'Employee Management',
          icon: 'people',
          route: '/swiftport/employee-management'
        },
        {
          id: 'location-management',
          label: 'Location Management',
          icon: 'place',
          route: '/swiftport/location-management'
        },
        {
          id: 'teams-management',
          label: 'Teams Management',
          icon: 'group',
          route: '/swiftport/teams-management'
        }
      ]
    },
    {
      id: 'activities',
      label: 'Activities',
      icon: 'moving',
      children: [
        {
          id: 'activities-list',
          label: 'Activities List',
          icon: 'list',
          route: '/swiftport/activities-list'
        },
        {
          id: 'activities-management',
          label: 'Activities Management',
          icon: 'dataset',
          route: '/swiftport/activity-management'
        }
      ]
    },
    {
      id: 'task-planning',
      label: 'Task Planning',
      icon: 'view_timeline',
      route: '/swiftport/task-planning'
    },
    {
      id: 'execution-history',
      label: 'Execution History',
      icon: 'scoreboard',
      route: '/swiftport/execution-history'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      route: '/swiftport/company-settings'
    },
    {
      id: 'demo',
      label: 'Components Demo',
      icon: 'construction',
      route: '/swiftport/demo'
    }
  ];

  private operarioMenuItems: SidebarMenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      route: '/swiftport/home',
    },
    {
      id: 'equipments-management',
      label: 'Equipment Management',
      icon: 'construction',
      route: '/swiftport/equipments-management'
    },
    {
      id: 'location-management',
      label: 'Location Management',
      icon: 'place',
      route: '/swiftport/location-management'
    },
    {
      id: 'activities',
      label: 'Activities',
      icon: 'moving',
      route: '/swiftport/activity-management'
    },
    {
      id: 'task-list-operario',
      label: 'Task List',
      icon: 'list',
      route: '/swiftport/task-list-operario'
    },
    {
      id: 'demo',
      label: 'Components Demo',
      icon: 'construction',
      route: '/swiftport/demo'
    }
  ];

  constructor() { }

  getOperarioMenuItems(): Observable<SidebarMenuItem[]> {
    return of(this.operarioMenuItems);
  }

  getAdminMenuItems(): Observable<SidebarMenuItem[]> {
    return of(this.adminMenuItems);
  }
}
