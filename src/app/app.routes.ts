import { Routes } from '@angular/router';
import { ComponentsDemoComponent } from './shared/views/components-demo/components-demo.component';
import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {RegisterComponent} from './core/registration/views/register/register.component';
import {AccountCreationComponent} from './core/registration/views/account-creation/account-creation.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import {PaymentInformationComponent} from './core/registration/views/payment-information/payment-information.component';
import { EquipmentManagementComponent } from './features/resources/pages/equipment-management/equipment-management.component';
import { EmployeeManagementComponent } from './features/resources/pages/employee-management/employee-management.component';
import { LocationManagementComponent } from './features/resources/pages/location-management/location-management.component';
import { TeamManagementComponent } from './features/resources/pages/team-management/team-management.component';
import { ActivityManagementComponent } from './features/planning/pages/activity-management/activity-management.component';
import {LoginComponent} from './features/security/pages/login/login.component';
import {HomeOperarioComponent} from './core/registration/views/home-operario/home-operario.component';
import {HomeAdminComponent} from './core/registration/views/home-admin/home-admin.component';
import {
  ActivityDetailViewComponent} from './features/planning/components/activity-detail-view/activity-detail-view.component';
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
import {CompanySettingsComponent} from './features/security/pages/company-settings/company-settings.component';
import {PasswordRecoveryComponent} from './features/security/pages/password-recovery/password-recovery.component';
import {SelectRoleComponent} from './features/security/pages/select-role/select-role.component';
import {UserManagementComponent} from './features/security/pages/user-management/user-management.component';
import {ActivitiesListComponent} from './features/executions/activities-list/activities-list.component';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
        { path: 'demo',             component: ComponentsDemoComponent},
        { path: 'equipments-management', component: EquipmentManagementComponent},
        { path: 'employee-management', component: EmployeeManagementComponent},
        { path: 'location-management', component: LocationManagementComponent},
        { path: 'teams-management', component: TeamManagementComponent},
        { path: 'activity-management', component: ActivityManagementComponent},
        { path: 'activities-list', component: ActivitiesListComponent},
        { path: 'routes-first-try', component: LoginComponent},
        { path: 'register', component: RegisterComponent},
        { path: 'login', component: LoginComponent},
        { path: 'payment', component: PaymentInformationComponent},
        { path: 'account', component: AccountCreationComponent},
        { path: 'home-operario', component: HomeOperarioComponent},
        { path: 'home-admin', component: HomeAdminComponent},
        { path: 'activity-details', component: ActivityDetailViewComponent},
        { path: 'execution-history', component: ExecutionHistoryViewComponent},
        { path: 'reports', component: ReportsViewComponent},
        { path: 'task-execution', component: TaskExecutionViewComponent},
        { path: 'task-list-operario', component: TaskListOperarioViewComponent},
        { path: 'company-settings', component: CompanySettingsComponent},
        { path: 'password-recovery', component: PasswordRecoveryComponent},
        { path: 'select-role', component: SelectRoleComponent},
        { path: 'user-management', component: UserManagementComponent},
        { path: '**', component: PageNotFoundComponent}
    ]
  },
  { path: 'register',         component: RegisterComponent },
  { path: 'account',          component: AccountCreationComponent},
  { path: 'payment',          component: PaymentInformationComponent},
  { path: '',                 redirectTo: 'register', pathMatch: 'full'},
  { path: 'demo',             component: ComponentsDemoComponent},
  { path: '**',               component: PageNotFoundComponent }
];
