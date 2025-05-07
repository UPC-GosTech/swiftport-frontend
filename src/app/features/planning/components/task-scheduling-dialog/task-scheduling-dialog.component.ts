import { Component } from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {InputComponent} from "../../../../shared/components/input/input.component";
import {SelectorComponent} from "../../../../shared/components/selector/selector.component";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-scheduling-dialog',
  imports: [
    ButtonComponent,
    InputComponent,
    SelectorComponent,
    FormsModule
  ],
  templateUrl: './task-scheduling-dialog.component.html',
  styleUrl: './task-scheduling-dialog.component.scss'
})
export class TaskSchedulingDialogComponent {
  startTime: string = '';
  startTimeDisabled: boolean = false;
  endTime: string = '';
  endTimeDisabled: boolean = false;

  // esto dsp debe ser un input, solo ando probando
  machineList = ['maquinita 1', 'maquinita 2', 'maquinita 3'];
  machine: string = '';
  squadList = ['squad 1765rvr etvgrt43', 'squad 2', 'squad 3'];
  squad: string = '';

  onStartTimeChange(value: string): void {
    this.startTime = value;
    console.log('Start time: ', this.startTime);
  }
  onEndTimeChange(value: string): void {
    this.endTime = value;
    console.log('End time: ', this.endTime);
  }
  onMachineChange(value: string): void {
    this.machine = value;
    console.log('Machine: ', this.machine);
  }
  onSquadChange(value: string): void {
    this.squad = value;
    console.log('Machine: ', this.squad);
  }

  onDisabledButton() {
    return !(this.startTime.length !== 0 &&
      this.endTime.length !== 0 &&
      this.machine.length !== 0 &&
      this.squad.length !== 0);
  }

  onSaveInformation(): void {
    console.log('Save information');
  }
}
