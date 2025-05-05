import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { Subject, takeUntil } from 'rxjs';

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
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isOpen = true;
  @Input() menuItems: SidebarMenuItem[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    if (this.menuItems.length === 0) {
      this.menuService.getMenuItems()
        .pipe(takeUntil(this.destroy$))
        .subscribe(items => {
          this.menuItems = items;
        });
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
