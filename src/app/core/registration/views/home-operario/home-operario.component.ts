import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ButtonComponent} from '../../../../shared/components/button/button.component';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-home-operario',
  imports: [
    ButtonComponent
  ],
  templateUrl: './home-operario.component.html',
  styleUrl: './home-operario.component.scss'
})
export class HomeOperarioComponent {

  constructor(private fb: FormBuilder, private router: Router) {}

  onTaskList() {
    this.router.navigate(['/task-list-operario']);
  }
}
