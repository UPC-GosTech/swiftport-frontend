import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() maxLength!: number;

  @Output() valueChange = new EventEmitter<string>();

  @Input() value = '';

  private onChange = (_: any) => {};
  private onTouched = () => {};

  // Llamado por Angular cuando el FormControl cambia externamente
  writeValue(obj: any): void {
    this.value = obj ?? '';
  }
  // Angular nos da la función que debemos llamar cuando el valor interno cambia
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // Angular nos da la función que debemos llamar cuando se toca (blur)
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // Cuando el FormControl se deshabilita/habilita
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Al cambiar el input
  onInputChange(value: string) {
    this.value = value;
    this.valueChange.emit(this.value);
    this.onChange(this.value);
  }

  // Al perder foco
  onBlur() {
    this.onTouched();
  }
}
