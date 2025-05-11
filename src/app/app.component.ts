import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import {TranslateService} from '@ngx-translate/core';
import {AccountCreationComponent} from './core/registration/views/account-creation/account-creation.component';
import {PaymentInformationComponent} from './core/registration/views/payment-information/payment-information.component';
import {RegisterComponent} from './core/registration/views/register/register.component';
import {
  ActivityDetailViewComponent
} from './features/planning/components/activity-detail-view/activity-detail-view.component';
import {
  ExecutionHistoryViewComponent
} from './features/planning/components/execution-history-view/execution-history-view.component';
import {ReportsViewComponent} from './features/planning/components/reports-view/reports-view.component';
import {
  TaskExecutionViewComponent
} from './features/planning/components/task-execution-view/task-execution-view.component';
import {
  TaskListOperarioViewComponent
} from './features/planning/components/task-list-operario-view/task-list-operario-view.component';
import {
  TaskSchedulingDialogComponent
} from './features/planning/components/task-scheduling-dialog/task-scheduling-dialog.component';
import {CompanySettingsComponent} from './features/security/pages/company-settings/company-settings.component';
import {LoginComponent} from './features/security/pages/login/login.component';
import {PasswordRecoveryComponent} from './features/security/pages/password-recovery/password-recovery.component';
import {SelectRoleComponent} from './features/security/pages/select-role/select-role.component';
import {UserManagementComponent} from './features/security/pages/user-management/user-management.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AccountCreationComponent,
    PaymentInformationComponent,
    RegisterComponent,
    ActivityDetailViewComponent,
    ExecutionHistoryViewComponent,
    ReportsViewComponent,
    TaskExecutionViewComponent,
    TaskListOperarioViewComponent,
    TaskSchedulingDialogComponent,
    CompanySettingsComponent,
    LoginComponent,
    PasswordRecoveryComponent,
    SelectRoleComponent,
    UserManagementComponent
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
