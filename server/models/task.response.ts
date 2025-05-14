export interface TaskResponse {
  taskId: number;
  taskName: string;
  activityId: number;
  locationId: number;
  description: string;
  status: 'Pendiente' | 'En progreso' | 'Finalizada';
  progress: number;
  createdAt: string;
  updatedAt: string;
} 