import { Component } from '@angular/core';
import {Employee} from '../../../resources/models/employee.entity';

@Component({
  selector: 'app-task-list-operario-view',
  imports: [],
  templateUrl: './task-list-operario-view.component.html',
  styleUrl: './task-list-operario-view.component.scss'
})
export class TaskListOperarioViewComponent {
  operario: Employee = new Employee();
}
