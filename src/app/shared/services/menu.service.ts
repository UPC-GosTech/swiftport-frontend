import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SidebarMenuItem } from '../components/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private adminMenuItems: SidebarMenuItem[] = [
    {
      id: 'home-admin',
      label: 'Home',
      icon: 'home',
      route: '/home-admin',
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'groups',
      route: '/users'
    },
    {
      id: 'management',
      label: 'Management',
      icon: 'monitoring',
      children: [
        {
          id: 'equipments-management',
          label: 'Equipment Management',
          icon: 'construction',
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
          label: 'Location Management',
          icon: 'place',
          route: '/location-management'
        },
        {
          id: 'teams-management',
          label: 'Teams Management',
          icon: 'group',
          route: '/teams-management'
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
          route: '/activities-list'
        },
        {
          id: 'activities-management',
          label: 'Activities Management',
          icon: 'dataset',
          route: '/activity-management'
        }
      ]
    },
    {
      id: 'task-planning',
      label: 'Task Planning',
      icon: 'view_timeline',
      route: '/task-planning'
    },
    {
      id: 'execution-history',
      label: 'Execution History',
      icon: 'order_play',
      route: '/execution-history'
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
    }
  ];

  private operarioMenuItems: SidebarMenuItem[] = [
    {
      id: 'home-operario',
      label: 'Home',
      icon: 'home',
      route: '/home-operario',
    },
    {
      id: 'equipments-management',
      label: 'Equipment Management',
      icon: 'construction',
      route: '/equipments-management'
    },
    {
      id: 'location-management',
      label: 'Location Management',
      icon: 'place',
      route: '/location-management'
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
          route: '/activities-list'
        },
        {
          id: 'activities-management',
          label: 'Activities Management',
          icon: 'dataset',
          route: '/activity-management'
        }
      ]
    },
    {
      id: 'task-list-operario',
      label: 'Task List',
      icon: 'list',
      route: '/task-list-operario'
    },
    {
      id: 'demo',
      label: 'Components Demo',
      icon: 'construction',
      route: '/demo'
    }
  ];

  private defaultMenuItems: SidebarMenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      id: 'equipments-management',
      label: 'Equipment Management',
      icon: 'construction',
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
      label: 'Location Management',
      icon: 'place',
      route: '/location-management'
    },
    {
      id: 'teams-management',
      label: 'Teams Management',
      icon: 'group',
      route: '/teams-management'
    },
    {
      id: 'activities',
      label: 'Activities',
      icon: 'schedule',
      route: '/activities-list'
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
      route: '/users'
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

  getOperarioMenuItems(): Observable<SidebarMenuItem[]> {
    return of(this.operarioMenuItems);
  }

  getAdminMenuItems(): Observable<SidebarMenuItem[]> {
    return of(this.adminMenuItems);
  }
}
