import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-selector',
  imports: [
    FormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorComponent),
      multi: true
    }
    ]
})
export class SelectorComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() color: 'secondary' | 'success' | 'error' | 'warning' = 'secondary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;

  @Output() selectionChange = new EventEmitter<string>();

  selectedOption = '';

  private onChange = (_: any) => {};
  protected onTouched = () => {};

  writeValue(obj: any): void {
    this.selectedOption = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(option: string) {
    this.selectedOption = option;
    this.selectionChange.emit(option);
    this.onChange(option);
    this.onTouched();
  }
}
