import { Component } from '@angular/core';
import {InputComponent} from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-payment-information',
  imports: [
    InputComponent
  ],
  templateUrl: './payment-information.component.html',
  styleUrl: './payment-information.component.scss'
})
export class PaymentInformationComponent {
  name: string = '';
  placeholderName: string = 'Ingrese su email...';
}
