export interface ActivityResponse {
  id: number;
  title: string;
  description: string;
  originLocationId: number;
  destinationLocationId: number;
  scheduledDate: string;
  estimatedDuration: number;
  actualStartTime: string;
  actualEndTime: string | null;
  priority: 'Alta' | 'Media' | 'Baja';
  status: 'En progreso' | 'Pendiente' | 'Finalizada';
  assignedCrewId: string;
  vehicleId: string;
  incidentReportIds: string[];
  supervisorNotes: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
} 