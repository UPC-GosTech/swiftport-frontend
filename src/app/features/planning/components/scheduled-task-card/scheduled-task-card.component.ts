import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskScheduling } from '../../model/taskScheduling.entity';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-scheduled-task-card',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TranslatePipe
  ],
  templateUrl: './scheduled-task-card.component.html',
  styleUrls: ['./scheduled-task-card.component.scss']
})
export class ScheduledTaskCardComponent {
  @Input() schedule!: TaskScheduling;
  @Output() editScheduling = new EventEmitter<TaskScheduling>();
  @Output() dragStart = new EventEmitter<DragEvent>();

  onDragStart(event: DragEvent): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('type', 'scheduled-task');
      event.dataTransfer.setData('schedulingId', this.schedule.id);
      event.dataTransfer.setData('taskName', this.schedule.task.taskName);
      event.dataTransfer.setData('startHour', this.schedule.startTime.getHours().toString());
      this.dragStart.emit(event);
    }
  }
}
