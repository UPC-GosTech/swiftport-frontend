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
        {path: 'activity-management', component: ActivityManagementComponent}
    ]
  },
  { path: 'register',         component: RegisterComponent },
  { path: 'account',          component: AccountCreationComponent},
  { path: 'payment',          component: PaymentInformationComponent},
  { path: '',                 redirectTo: 'register', pathMatch: 'full'},
  { path: 'demo',             component: ComponentsDemoComponent},
  { path: '**',               component: PageNotFoundComponent }
];
