import { Component } from '@angular/core';
import {InputComponent} from '../../../../shared/components/input/input.component';
import {ButtonComponent} from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-account-creation',
  imports: [
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.scss'
})
export class AccountCreationComponent {
  email: string = '';
  placeholderEmail: string = 'Ingrese su email...';
  name: string = '';
  placeholderName: string = 'Ingrese su nombre...';
  password1: string = '';
  placeholderP1: string = 'Ingrese su password...';
  password2: string = '';
  placeholderP2: string = 'Repita su password...';

  onEmailChange(value: string): void {
    this.email = value;
    console.log('Valor ingresado:', value);
  }
  onNameChange(value: string): void {
    this.name = value;
    console.log('Valor ingresado:', value);
  }
  onP1Change(value: string): void {
    this.password1 = value;
    console.log('Valor ingresado:', value);
  }
  onP2Change(value: string): void {
    this.password2 = value;
    console.log('Valor ingresado:', value);
  }

  onSaveEvent(): void {

  }

}
