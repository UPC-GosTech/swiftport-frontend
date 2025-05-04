import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-selector.component',
  imports: [],
  templateUrl: './selector.component.component.html',
  styleUrl: './selector.component.component.scss'
})
export class SelectorComponentComponent {
  @Input() options: string[] = [];
  @Input() color: 'secondary' | 'seccess' | 'error' | 'warning' = 'secondary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Output() selectionChange = new EventEmitter<string>();

  selectedOption: string = '';

  onSelectionChange(option: string) {
    this.selectedOption = option;
    this.selectionChange.emit(this.selectedOption);
  }
}
