import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SignUpRequest } from '../../models/sign-up.request';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, TranslatePipe]
})
export class RegisterComponent {
  // Datos de la empresa
  ruc: string = '';
  legalName: string = '';
  commercialName: string = '';
  address: string = '';
  city: string = '';
  country: string = '';
  tenantPhone: string = '';
  tenantEmail: string = '';
  website: string = '';
  
  // Datos del usuario
  username: string = '';
  password: string = '';
  repeatPassword: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  
  errorMessage: string = '';
  isLoading: boolean = false;
  submitted: boolean = false;

  private authService = inject(AuthenticationService);
  private router = inject(Router);

  onRegister(): void {
    this.submitted = true;
    this.errorMessage = '';

    // Validaciones básicas
    if (!this.username || !this.password || !this.repeatPassword || !this.email || 
        !this.firstName || !this.lastName || !this.ruc || !this.legalName) {
      this.errorMessage = 'register-container.fill-required';
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

    this.isLoading = true;
    
    const signUpRequest = new SignUpRequest({
      ruc: this.ruc,
      legalName: this.legalName,
      commercialName: this.commercialName || this.legalName,
      address: this.address,
      city: this.city,
      country: this.country,
      tenantPhone: this.tenantPhone,
      tenantEmail: this.tenantEmail || this.email,
      website: this.website,
      username: this.username,
      password: this.password,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    });

    this.authService.signUp(signUpRequest).subscribe({
      next: (response) => {
        this.authService.handleSuccessfulSignUp(response);
        this.isLoading = false;
      },
      error: (error) => {
        this.authService.handleAuthError(error, '/register');
        this.isLoading = false;
        this.errorMessage = 'register-container.error';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
