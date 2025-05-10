import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-selector',
  imports: [
    FormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent {
  @Input() options: string[] = [];
  @Input() color: 'secondary' | 'success' | 'error' | 'warning' = 'secondary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Output() selectionChange = new EventEmitter<string>();

  selectedOption: string = '';

  onSelectionChange(option: string) {
    this.selectedOption = option;
    this.selectionChange.emit(this.selectedOption);
  }
}
