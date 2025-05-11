import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  submitted: boolean = false;

  constructor(private router: Router) {}

  // Método para iniciar sesión
  onLogin(): void {
    this.submitted = true;
    this.errorMessage = '';

    // Validación: campos vacíos
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    // Validación: formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Ingrese un email válido.';
      return;
    }

    // Validación: longitud mínima de contraseña
    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    // Simulación de autenticación
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

  // Navegación al formulario de registro
  onRegister(): void {
    this.router.navigate(['/register']);
  }

  // Navegación al formulario de recuperación de contraseña
  goToRecovery(): void {
    this.router.navigate(['/password-recovery']);
  }
}
