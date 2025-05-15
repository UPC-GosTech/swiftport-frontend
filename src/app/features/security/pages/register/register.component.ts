import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { User } from '../../models/user.entity';

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

  private userService = inject(UserService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

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

    this.isLoading = true;
    this.userService.getAllUsers().subscribe(users => {
      const exists = users.some(u => u.email === this.email);
      if (exists) {
        this.isLoading = false;
        this.errorMessage = 'register-container.email-exists';
        return;
      }
      const newUser: User = {
        id: 0, // El backend/mockApi debe asignar el id
        email: this.email,
        password: this.password,
        role: 'admin',
        name: this.email.split('@')[0],
        accountId: 1,
        status: 'active'
      };
      this.userService.createUser(newUser).subscribe(user => {
        console.log(user);
        this.isLoading = false;
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
        this.router.navigate(['/dashboard']);
      }, err => {
        this.isLoading = false;
        this.errorMessage = 'register-container.error';
      });
    }, err => {
      this.isLoading = false;
      this.errorMessage = 'register-container.error';
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
