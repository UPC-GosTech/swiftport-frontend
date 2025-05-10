import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule]
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

    // Validaciones básicas
    if (!this.email || !this.password || !this.repeatPassword) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Por favor ingrese un email válido.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Simular registro exitoso
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      console.log('Usuario registrado:', this.email);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
    }, 1200);
  }
}
