import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SidebarMenuItem } from '../components/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private defaultMenuItems: SidebarMenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      id: 'equipments-management',
      label: 'Equipments Management',
      icon: 'equipment',
      route: '/equipments-management'
    },
    {
      id: 'employee-management',
      label: 'Employee Management',
      icon: 'people',
      route: '/employee-management'
    },
    {
      id: 'location-management',
      label: 'Gestión de Zonas',
      icon: 'place',
      route: '/location-management'
    },
    {
      id: 'teams-management',
      label: 'Gestión de Equipos',
      icon: 'group',
      route: '/teams-management'
    },
    {
      id: 'planning',
      label: 'Planning',
      icon: 'schedule',
      route: '/planning'
    },
    {
      id: 'activity-management',
      label: 'Activity Management',
      icon: 'schedule',
      route: '/activity-management'
    },
    {
      id: 'task-planning',
      label: 'Task Planning',
      icon: 'schedule',
      route: '/task-planning'
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'people',
      children: [
        {
          id: 'users-list',
          label: 'All Users',
          route: '/users'
        },
        {
          id: 'users-add',
          label: 'Add User',
          route: '/users/add'
        }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      route: '/settings'
    },
    {
      id: 'demo',
      label: 'Components Demo',
      icon: 'construction',
      route: '/demo'
    },
    {
      id: 'routes-first-try',
      label: 'Probando routeo',
      route: '/routes-first-try'
    }
  ];

  constructor() { }

  getMenuItems(): Observable<SidebarMenuItem[]> {
    return of(this.defaultMenuItems);
  }
}
