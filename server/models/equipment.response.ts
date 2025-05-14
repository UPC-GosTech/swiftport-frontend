export interface EquipmentResponse {
  id: number;
  plateNumber: string;
  type: string;
  capacityLoad: number;
  capacityPassengers: number;
  status: 'Disponible' | 'Mantenimiento';
} 