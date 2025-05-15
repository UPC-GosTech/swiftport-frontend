export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    accountId: number;
    status: string;
    
constructor(
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    role?: string,
    accountId?: number,
    status?: string
) {
    this.id = id || 0;
    this.name = name || '';
    this.email = email || '';
    this.password = password || '';
    this.role = role || '';
    this.accountId = accountId || 0;
    this.status = status || '';
}
}
