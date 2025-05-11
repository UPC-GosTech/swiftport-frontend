import { Component } from '@angular/core';
import {Employee} from '../../../resources/models/employee.entity';
import {TableComponent} from "../../../../shared/components/table/table.component";
import {Columns} from '../../../../shared/components/table/table.models';
import {Task} from '../../model/task.entity';

@Component({
  selector: 'app-task-list-operario-view',
    imports: [
        TableComponent
    ],
  templateUrl: './task-list-operario-view.component.html',
  styleUrl: './task-list-operario-view.component.scss'
})
export class TaskListOperarioViewComponent {
  operario: Employee = new Employee();

  tasks: Task[] = [ new Task(), new Task(), new Task()];

  columns: Columns[] = [
    {
      header: {
        key: 'activity',
        label: 'Activity',
      },
      cell: 'activity',
      type: 'text',
      sortable: false,
      hide: {
        visible: true,
        label: 'Activity',
      }
    },
    {
      header: {
        key: 'taskId',
        label: 'Task ID',
      },
      cell: 'taskId',
      type: 'text',
      sortable: false,
      hide: {
        visible: true,
        label: 'Task ID',
      }
    },
    {
      header: {
        key: 'name',
        label: 'Name',
      },
      cell: 'name',
      type: 'text',
      sortable: false,
      hide: {
        visible: true,
        label: 'Name',
      }
    },
    {
      header: {
        key: 'schedule',
        label: 'Schedule',
      },
      cell: 'schedule',
      type: 'text',
      sortable: false,
      hide: {
        visible: false,
        label: 'Schedule',
      }
    },
    {
      header: {
        key: 'equipment',
        label: 'Equipment',
      },
      cell: 'equipment',
      type: 'text',
      sortable: false,
      hide: {
        visible: true,
        label: 'Equipment',
      }
    }
  ];

  loadingTest = false;
  tableData : any[] = this.tasks.map(tasks => ({
    activity: tasks.activityId,
    name: tasks.taskName,
    taskId: tasks.taskId,
    schedule: tasks.createdAt,
    equipment: tasks.locationId
  }));
}
