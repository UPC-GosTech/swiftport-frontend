import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SidebarMenuItem } from '../components/sidebar/sidebar.component';
import { AuthenticationService } from 'src/app/features/iam/services/authentication.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Roles } from 'src/app/features/iam/models/roles.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  router = inject(Router);
  authService = inject(AuthenticationService);
  localStorageService = inject(LocalStorageService);

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

  private supervisorMenuItems: SidebarMenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      route: '/swiftport/home'
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
      id: 'task-list-supervisor',
      label: 'Task List',
      icon: 'list',
      route: '/swiftport/task-list-supervisor'
    }
  ];

  constructor() {}

  getMenuItems(): Observable<SidebarMenuItem[]> {
    if(this.localStorageService.hasKey('menuItems')){
      const menuItems : SidebarMenuItem[] = this.localStorageService.getItem('menuItems');
      return of(menuItems);
    }
    return this.authService.currentRoles.pipe(
      map(roles => {
        if (!roles || roles.length === 0) {
          return [];
        }
        const firstRole = roles[0];
        let menuItems : SidebarMenuItem[] = [];
        switch (firstRole) {
          case Roles.Admin:
            menuItems = this.adminMenuItems;
            break;
          case Roles.LogisticOperator:
            menuItems =  this.operarioMenuItems;
            break;
          case Roles.LogisticSupervisor:
            menuItems =  this.supervisorMenuItems;
            break;
          default:
            menuItems = [];
        }
        this.localStorageService.setItem('menuItems', menuItems);
        return menuItems;
      })
    );
  }

  handleRoleError(): void {
  
  }
  getSupervisorMenuItems(): Observable<SidebarMenuItem[]> {
    return of(this.supervisorMenuItems);
  }

  getOperarioMenuItems(): Observable<SidebarMenuItem[]> {
    return of(this.operarioMenuItems);
  }

  getAdminMenuItems(): Observable<SidebarMenuItem[]> {
    return of(this.adminMenuItems);
  }
}
