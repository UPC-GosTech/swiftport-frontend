import { Component } from '@angular/core';
import {InputComponent} from "../../../../shared/components/input/input.component";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-execution-view',
  imports: [
    InputComponent,
    FormsModule
  ],
  templateUrl: './task-execution-view.component.html',
  styleUrl: './task-execution-view.component.scss'
})
export class TaskExecutionViewComponent {
  startTime: string = '';
  startTimeDisabled: boolean = false;

  onStartTimeChange(value: string): void {
    this.startTime = value;
    console.log('Start time: ', this.startTime);
  }
}
