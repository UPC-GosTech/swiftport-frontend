export class Activity {
  id?: string;
  title?: string;
  description?: string;
  originLocationId?: number;
  destinationLocationId?: number;
  scheduledDate?: Date;
  estimatedDuration?: number;
  actualStartTime?: Date;
  actualEndTime?: Date;
  priority?: 'Alta' | 'Media' | 'Baja';
  status?: 'Pendiente' | 'En progreso' | 'Finalizada' | 'Cancelada';
  assignedCrewId?: string;
  vehicleId?: string;
  incidentReportIds?: string[];
  supervisorNotes?: string;
  attachments?: string[]; // URLs a documentos/fotos
  createdAt?: Date;
  updatedAt?: Date;
}
