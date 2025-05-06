import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() label = 'Click me';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() color:
    | 'primary'
    | 'accent'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info' = 'primary';
  @Input() icon?: string;
  @Input() iconPosition: 'start' | 'end' = 'start';
  @Output() clicked = new EventEmitter<void>();
  @Input() textColor: 'black' | 'white' = 'black';


  handleClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
