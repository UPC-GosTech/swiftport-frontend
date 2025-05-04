import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  onInputChange(value: string) {
    this.value = value;
    this.valueChange.emit(this.value);
  }
}
