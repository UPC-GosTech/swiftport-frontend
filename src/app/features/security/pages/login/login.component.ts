import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, NgIf]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  submitted: boolean = false;

  constructor(private router: Router) {}

  onLogin(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Ingrese un email válido.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;

      const isValidUser = this.email === 'admin@swiftport.com' && this.password === '123456';

      if (isValidUser) {
        console.log('Login exitoso');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Email o contraseña incorrectos.';
      }
    }, 1200);
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }

  goToRecovery(): void {
    this.router.navigate(['/password-recovery']);
  }

  onSumit() {
    if (this.password.length >= 6) {
      this.router.navigate(['/swiftport'], { state: { usertype: 'operario'}});
    }
    else {
      this.router.navigate(['/swiftport'], { state: { usertype: 'admin'}});
    }
  }
}
