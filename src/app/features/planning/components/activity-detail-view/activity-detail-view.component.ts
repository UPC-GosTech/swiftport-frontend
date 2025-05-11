import {ChangeDetectorRef, Component, Input} from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}

  tasks: Task[] = [ new Task(), new Task()];
  activity: Activity = new Activity();

  showInputs: boolean = false;

  originLocationIdInput: string = '';
  destinationLocationIdInput: string = '';
  estimatedDurationIdInput: string = '';
  scheduledDateInput: string = '';
  statusInput: string = '';
  descriptionInput: string = '';

  toTaskSegmentationView() {
    // routear a Task Segmentation View
  }

  onEditActivity() {
    this.showInputs = false;
    this.cdr.detectChanges();
    if (this.originLocationIdInput.trim() !== '') this.activity.originLocationId = Number(this.originLocationIdInput);
    if (this.destinationLocationIdInput.trim() !== '') this.activity.destinationLocationId = Number(this.destinationLocationIdInput);
    if (this.estimatedDurationIdInput.trim() !== '') this.activity.estimatedDuration = Number(this.estimatedDurationIdInput);
    if (this.scheduledDateInput.trim() !== '') this.activity.scheduledDate = new Date(this.scheduledDateInput);
    if (this.statusInput.trim() !== '') this.activity.status = this.statusInput;
    if (this.descriptionInput.trim() !== '') this.activity.description = this.descriptionInput;
    console.log(this.activity);
  }

  onEnableInputs() {
    this.showInputs = true;
    this.cdr.detectChanges();
    this.originLocationIdInput = '';
    this.destinationLocationIdInput = '';
    this.estimatedDurationIdInput = '';
    this.scheduledDateInput = '';
    this.statusInput = '';
    this.descriptionInput = '';
  }

  onOriginLocationIdChange(value: string) {
    this.originLocationIdInput = value;
  }

  onDestinationLocationIdChange(value: string) {
    this.destinationLocationIdInput = value;
  }

  onEstimatedDurationChange(value: string) {
    this.estimatedDurationIdInput = value;
  }

  onScheduledDateChange(value: string) {
    this.scheduledDateInput = String(value);
  }

  onStatusChange(value: string) {
    this.statusInput = value;
  }

  onDescriptionChange(value: string) {
    this.descriptionInput = value;
  }
}
