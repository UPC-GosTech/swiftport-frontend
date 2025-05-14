import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router, private location: Location) {}

  @Output() toggleSidebar = new EventEmitter<void>();

  previousEndpoint: string = '/';
  enter: boolean = true;

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onProfile() {
    if (this.enter) {
      const currentUrl = this.location.path();
      this.previousEndpoint = currentUrl.split('?')[0];
      console.log("Endpoint de la ruta anterior:", this.previousEndpoint);
      this.router.navigate(['/swiftport/profile']);
      this.enter = false;
    } else {
      this.router.navigate([this.previousEndpoint]);
      this.enter = true;
    }
  }
}
