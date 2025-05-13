import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import {MenuService} from '../../shared/services/menu.service';

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
    private router: Router
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation);
    if (navigation?.extras.state) {
      this.userType = navigation.extras.state[0];
    }
    console.log('aaa', this.userType);
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
