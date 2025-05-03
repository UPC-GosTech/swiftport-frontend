import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label = 'Click me';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';

  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
