import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() onlyIcon = false;
  @Input() color: 'primary' | 'secondary' | 'danger' | 'neutral' = 'primary';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading = false;

  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event) {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
