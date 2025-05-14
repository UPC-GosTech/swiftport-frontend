export interface UserSession {
  jwt: string;
  userId: string;
  userName: string;
  email: string;
  role: string;
  createdAt: number;
  expiresAt: number;
  companyId: string;
  permissions: string[];
}

