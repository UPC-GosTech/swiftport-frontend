export class Activity {
  id: string;
  title: string;
  description: string;
  originLocationId: number;
  destinationLocationId: number;
  scheduledDate: Date;
  estimatedDuration: number;
  actualStartTime: Date;
  actualEndTime: Date;
  priority: string ;
  status: string;
  assignedCrewId: string;
  vehicleId: string;
  incidentReportIds: string[];
  supervisorNotes: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = '';
    this.title = '';
    this.description = '';
    this.originLocationId = 0;
    this.destinationLocationId = 0;
    this.scheduledDate = new Date();
    this.estimatedDuration = 0;
    this.actualStartTime = new Date();
    this.actualEndTime = new Date();
    this.priority = '';
    this.status = '';
    this.assignedCrewId = '';
    this.vehicleId = '';
    this.incidentReportIds = [];
    this.supervisorNotes = '';
    this.attachments = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
