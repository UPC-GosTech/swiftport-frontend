import {Component, EventEmitter, Output} from '@angular/core';

import {MatFormField} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [
    MatFormField,
    FormsModule,
    MatIcon,
    NgIf,
    MatLabel,
  ],
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  onSearchChange(): void {
    this.search.emit(this.searchTerm);
  }
}
