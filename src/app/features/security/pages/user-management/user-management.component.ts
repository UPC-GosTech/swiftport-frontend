import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.entity';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateDialogComponent } from '../../components/user-create-dialog/user-create-dialog.component';
import { UserEditDialogComponent } from '../../components/user-edit-dialog/user-edit-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  imports: [
    FormsModule,
    NgForOf,
    TranslatePipe,
    ConfirmationDialogComponent
  ],
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  roles: string[] = ['admin', 'supervisor', 'operario'];
  selectedRole: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  isLoading: boolean = false;
  errorMessage: string = '';

  private userService = inject(UserService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
        this.filterUsers();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'user-management.error-loading';
        this.isLoading = false;
      }
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      (!this.selectedRole || user.role === this.selectedRole) &&
      (user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(UserCreateDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe(() => this.loadUsers());
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe(() => this.loadUsers());
      }
    });
  }

  deleteUser(user: User): void {
    if (user.role === 'admin') {
      alert('No se puede eliminar un usuario con rol admin');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro que desea eliminar este usuario?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(() => this.loadUsers());
      }
    });
  }

  toggleEstado(user: User): void {
    const updatedUser = { ...user, status: user.status === 'active' ? 'inactive' : 'active' };
    this.userService.updateUser(updatedUser).subscribe(() => this.loadUsers());
  }
}
