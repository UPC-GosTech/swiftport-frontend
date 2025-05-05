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
    }
  ];

  constructor() { }

  getMenuItems(): Observable<SidebarMenuItem[]> {
    return of(this.defaultMenuItems);
  }
} 