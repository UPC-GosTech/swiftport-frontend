import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

interface Usuario {
  nombre: string;
  email: string;
  rol: string;
  estado: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  users: Usuario[] = [
    { nombre: 'Ana Torres', email: 'ana@mail.com', rol: 'admin', estado: 'activo' },
    { nombre: 'Luis Prado', email: 'luis@mail.com', rol: 'supervisor', estado: 'inactivo' },
    { nombre: 'Elena Díaz', email: 'elena@mail.com', rol: 'operario', estado: 'activo' },
  ];

  filteredUsers: Usuario[] = [...this.users];
  paginatedUsers: Usuario[] = [];
  roles: string[] = ['admin', 'supervisor', 'operario'];
  selectedRole: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;

  constructor() {
    this.updatePagination();
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      (!this.selectedRole || user.rol === this.selectedRole) &&
      (user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
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
    alert('Abrir modal para crear usuario');
  }

  editUser(user: Usuario): void {
    alert(`Editar usuario: ${user.nombre}`);
  }

  toggleEstado(user: Usuario): void {
    user.estado = user.estado === 'activo' ? 'inactivo' : 'activo';
    this.updatePagination();
  }
}
