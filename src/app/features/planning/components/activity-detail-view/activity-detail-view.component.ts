import {Component, Input} from '@angular/core';
import {SegmentedTaskComponent} from '../segmented-task/segmented-task.component';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { Task } from '../../model/task/task.entity';
import {Activity} from '../../model/activity/activity.entity';
import {ButtonComponent} from '../../../../shared/components/button/button.component';
import {InputComponent} from '../../../../shared/components/input/input.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-activity-detail-view',
  imports: [
    SegmentedTaskComponent,
    NgForOf,
    ButtonComponent,
    DatePipe,
    InputComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './activity-detail-view.component.html',
  styleUrl: './activity-detail-view.component.scss'
})
export class ActivityDetailViewComponent {
  tasks: Task[] = [ new Task(), new Task()];
  activity: Activity = new Activity();

  showInputs: boolean = true;

  toTaskSegmentationView() {

  }

  onEditActivity() {

  }

  onOriginLocationChange($event: string) {

  }
}
