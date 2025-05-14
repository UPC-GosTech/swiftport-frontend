import { Activity } from "../model/activity.entity";
import { TaskAssembler } from "./task.assembler";
import { ActivityResponse } from "server/models/activity.response";

export class ActivityAssembler {
  static toResponse(activity: Activity): ActivityResponse {
    return {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      originLocationId: activity.originLocationId,
      destinationLocationId: activity.destinationLocationId,
      scheduledDate: activity.scheduledDate.toISOString(),
      estimatedDuration: activity.estimatedDuration,
      actualStartTime: activity.actualStartTime?.toISOString() || '',
      actualEndTime: activity.actualEndTime?.toISOString() || null,
      priority: activity.priority,
      status: activity.status as 'En progreso' | 'Pendiente' | 'Finalizada',
      assignedCrewId: activity.assignedCrewId,
      vehicleId: activity.vehicleId,
      incidentReportIds: activity.incidentReportIds,
      supervisorNotes: activity.supervisorNotes || '',
      attachments: activity.attachments || [],
      createdAt: activity.createdAt?.toISOString() || '',
      updatedAt: activity.updatedAt?.toISOString() || '',
      tasksIds: activity.tasksIds,
      zoneOriginId: activity.zoneOriginId,
      zoneDestinationId: activity.zoneDestinationId
    };
  }

  static toEntity(dto: ActivityResponse): Activity {
    const activity = new Activity(dto.id);
    activity.title = dto.title;
    activity.description = dto.description;
    activity.originLocationId = dto.originLocationId;
    activity.destinationLocationId = dto.destinationLocationId;
    activity.scheduledDate = new Date(dto.scheduledDate);
    activity.estimatedDuration = dto.estimatedDuration;
    activity.actualStartTime = dto.actualStartTime ? new Date(dto.actualStartTime) : null;
    activity.actualEndTime = dto.actualEndTime ? new Date(dto.actualEndTime) : null;
    activity.priority = dto.priority;
    activity.status = dto.status;
    activity.assignedCrewId = dto.assignedCrewId;
    activity.vehicleId = dto.vehicleId;
    activity.incidentReportIds = dto.incidentReportIds;
    activity.supervisorNotes = dto.supervisorNotes;
    activity.attachments = dto.attachments;
    activity.createdAt = dto.createdAt ? new Date(dto.createdAt) : undefined;
    activity.updatedAt = dto.updatedAt ? new Date(dto.updatedAt) : undefined;
    activity.tasksIds = dto.tasksIds;
    activity.zoneOriginId = dto.zoneOriginId;
    activity.zoneDestinationId = dto.zoneDestinationId;
    return activity;
  }
}
