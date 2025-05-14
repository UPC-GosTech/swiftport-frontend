import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import {MenuService} from '../../shared/services/menu.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserSession } from '../../features/security/models/userSession.entity';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent, HeaderComponent, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {

  isSidebarOpen = true;
  userType: string = '';

  constructor(
    private menuService: MenuService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const userSession: UserSession = this.localStorageService.getItem('userSession');
    this.userType = userSession.role;
    console.log('userType', this.userType);
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
