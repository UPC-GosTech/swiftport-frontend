import {Component, Input} from '@angular/core';
import { Task } from '../../model/task/task.entity';

@Component({
  selector: 'app-segmented-task',
  imports: [],
  templateUrl: './segmented-task.component.html',
  styleUrl: './segmented-task.component.scss'
})
export class SegmentedTaskComponent {
  //@Input() task!: Task;

  task = new Task();

  usedPortionValue: number = this.task.progress <= 100? this.task.progress : 100;
  availablePortionValue: number = 100 - this.usedPortionValue;
}
