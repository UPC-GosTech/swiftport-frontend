import { Routes } from '@angular/router';
import { ComponentsDemoComponent } from './shared/views/components-demo/components-demo.component';
import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {RegisterComponent} from './core/registration/views/register/register.component';
import {AccountCreationComponent} from './core/registration/views/account-creation/account-creation.component';
import {PaymentInformationComponent} from './core/registration/views/payment-information/payment-information.component';

export const routes: Routes = [
  { path: 'register',         component: RegisterComponent },
  { path: 'account',          component: AccountCreationComponent},
  { path: 'payment',          component: PaymentInformationComponent},
  { path: '',                 redirectTo: 'register', pathMatch: 'full'},
  { path: '**',               component: PageNotFoundComponent },
  { path: 'demo',             component: ComponentsDemoComponent}
];
