export interface EmployeeResponse {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
  positionsId: number[];
} 