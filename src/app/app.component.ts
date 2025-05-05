import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swiftport-frontend';
  isDarkTheme = false;

  options = [
    { path: '/register', title: 'Register' },
    { path: '/account', title: 'Account' },
    { path: '/payment', title: 'Payment' },
  ]


  constructor(private themeService: ThemeService, private translate: TranslateService) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.themeService.theme$.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

}
