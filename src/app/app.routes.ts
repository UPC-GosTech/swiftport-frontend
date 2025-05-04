import { Routes } from '@angular/router';
import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {RegisterComponent} from './core/registration/views/register/register.component';
import {AccountCreationComponent} from './core/registration/views/account-creation/account-creation.component';

export const routes: Routes = [
  { path: 'register',         component: RegisterComponent },
  { path: 'account',          component: AccountCreationComponent},
  { path: '',                 redirectTo: 'register', pathMatch: 'full' },
  { path: '**',               component: PageNotFoundComponent }
];
