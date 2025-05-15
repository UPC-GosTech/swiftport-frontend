import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserSession } from '../../models/userSession.entity';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.entity';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, NgIf, TranslatePipe]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  submitted: boolean = false;

  private userService = inject(UserService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  onLogin(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'login-container.fill';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'login-container.email-invalid';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'login-container.password-min';
      return;
    }

    this.isLoading = true;
    this.userService.getAllUsers().subscribe(users => {
      const user = users.find(u => u.email === this.email && u.password === this.password);
      if (user) {
        // Guardar sesión
        this.localStorageService.setItem('userSession', {
          userId: user.id,
          userName: user.name,
          email: user.email,
          role: user.role,
          jwt: '',
          createdAt: Date.now(),
          expiresAt: Date.now() + 86400000,
          companyId: '',
          permissions: []
        });
        this.isLoading = false;
        this.router.navigate(['/swiftport']);
      } else {
        this.isLoading = false;
        this.errorMessage = 'login-container.invalid-credentials';
      }
    }, err => {
      this.isLoading = false;
      this.errorMessage = 'login-container.error';
    });
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }

  goToRecovery(): void {
    this.router.navigate(['/password-recovery']);
  }

  onSumit() {
    // Deprecated: lógica real ahora está en onLogin
  }
}
