import { Routes } from '@angular/router';
import { ComponentsDemoComponent } from './shared/views/components-demo/components-demo.component';
import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {RegisterComponent} from './core/registration/views/register/register.component';
import {AccountCreationComponent} from './core/registration/views/account-creation/account-creation.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
        { path: 'demo',             component: ComponentsDemoComponent},
    ]
  },
  { path: 'register',         component: RegisterComponent },
  { path: 'account',          component: AccountCreationComponent},
  { path: '',                 redirectTo: 'register', pathMatch: 'full'},
  { path: 'demo',             component: ComponentsDemoComponent},
  { path: '**',               component: PageNotFoundComponent }
];