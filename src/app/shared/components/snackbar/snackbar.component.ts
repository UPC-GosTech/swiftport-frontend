import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  imports: [
    MatIcon,
    NgIf,
  ],
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  @Input() message: string = '';
  @Input() icon: string = '';  // opcional: puedes anhadir un icono si lo deseas
  @Input() duration: number = 3000;  // duracion en milisegundos (por defecto 3 segundos)
  @Output() closed = new EventEmitter<void>();

  show: boolean = false;

  ngOnInit() {
    this.showSnackbar();
  }

  showSnackbar() {
    this.show = true;
    setTimeout(() => {
      this.close();
    }, this.duration);
  }

  close() {
    this.show = false;
    this.closed.emit();
  }
}
