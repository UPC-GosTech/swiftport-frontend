import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarMenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isOpen = true;
  @Input() menuItems: SidebarMenuItem[] = [];
  @Input() userType: string = '';

  private destroy$ = new Subject<void>();

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    if (this.menuItems.length === 0) {
      console.log('eee', this.userType);
      if (this.userType === 'operario') {
        this.menuService.getOperarioMenuItems()
          .pipe(takeUntil(this.destroy$))
          .subscribe(items => {
            this.menuItems = items;
          });
      } else {
        this.menuService.getAdminMenuItems()
          .pipe(takeUntil(this.destroy$))
          .subscribe(items => {
            this.menuItems = items;
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSubmenu(item: SidebarMenuItem): void {
    item.expanded = !item.expanded;
  }

  hasChildren(item: SidebarMenuItem): boolean {
    return !!item.children && item.children.length > 0;
  }
}
