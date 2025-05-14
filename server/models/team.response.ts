export interface TeamResponse {
  id: number;
  name: string;
  date: string;
  zoneId: number;
  status: 'Activo' | 'Inactivo';
  membersId: number[];
} 