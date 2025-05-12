export class Activity {
  id: number;
  title: string;
  description: string;
  originLocationId: number;
  destinationLocationId: number;
  scheduledDate: Date;
  estimatedDuration: number;
  actualStartTime: Date | null;
  actualEndTime: Date | null;
  priority: 'Alta' | 'Media' | 'Baja';
  status: 'Pendiente' | 'En progreso' | 'Finalizada' | 'Cancelada';
  assignedCrewId: string;
  vehicleId: string;
  incidentReportIds: string[];
  supervisorNotes: string | null;
  attachments?: string[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.originLocationId = 0;
    this.destinationLocationId = 0;
    this.scheduledDate = new Date();
    this.estimatedDuration = 0;
    this.actualStartTime = new Date();
    this.actualEndTime = new Date();
    this.priority = 'Media';
    this.status = 'Pendiente';
    this.assignedCrewId = '';
    this.vehicleId = '';
    this.incidentReportIds = [];
    this.supervisorNotes = '';
    this.attachments = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

