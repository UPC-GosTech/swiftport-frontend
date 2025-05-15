import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { User } from '../models/user.entity';
import { map, Observable } from 'rxjs';
import { UserAssembler, UserResponse } from '../mappers/user.assembler';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class UserService extends BaseService<UserResponse> {
  protected override serverBaseUrl = environment.mockBaseUrl;
  protected override resourceEndpoint = '/user';

  getAllUsers(): Observable<User[]> {
    return this.getAll().pipe(
      map(users => users.map(user => UserAssembler.toEntity(user)))
    );
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.getById(id).pipe(
      map(user => user ? UserAssembler.toEntity(user) : undefined)
    );
  } 

  createUser(user: User): Observable<User> {
    return this.create(UserAssembler.toResponse(user)).pipe(
      map(user => UserAssembler.toEntity(user))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.update(user.id, UserAssembler.toResponse(user)).pipe(
      map(user => UserAssembler.toEntity(user))
    );
  }

  deleteUser(id: number): Observable<boolean> {
    return this.delete(id).pipe(
      map(() => true)
    );
  }
}
