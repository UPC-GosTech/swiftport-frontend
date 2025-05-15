import { User } from "../models/user.entity";

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    accountId: number;
    status: string;
}

export class UserAssembler {
    static toEntity(response: UserResponse): User {
        return new User(response.id, response.name, response.email, response.password, response.role, response.accountId, response.status);
    }

    static toResponse(entity: User): UserResponse {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            password: entity.password,
            role: entity.role,
            accountId: entity.accountId,
            status: entity.status
        }
    }
}

