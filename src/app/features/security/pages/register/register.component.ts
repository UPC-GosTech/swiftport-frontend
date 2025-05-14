import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, TranslatePipe]
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  submitted: boolean = false;

  constructor(private router: Router) {}

  onRegister(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.email || !this.password || !this.repeatPassword) {
      this.errorMessage = 'register-container.fill';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'register-container.email-invalid';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'register-container.password-min';
      return;
    }

    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'register-container.password-mismatch';
      return;
    }

    // Simulate successful registration
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/login']);
    }, 1200);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
