import { Equipment } from "../models/equipment.entity";
import { EquipmentResponse } from "server/models/equipment.response";

export class EquipmentAssembler {
  static toResponse(equipment: Equipment): EquipmentResponse {
    return {
      id: equipment.id,
      plateNumber: equipment.plateNumber,
      type: equipment.type,
      capacityLoad: equipment.capacityLoad,
      capacityPassengers: equipment.capacityPassengers,
      status: equipment.status as 'Disponible' | 'Mantenimiento'
    }
  }

  static toEntity(dto: EquipmentResponse): Equipment {
    return new Equipment({
      id: dto.id,
      plateNumber: dto.plateNumber,
      type: dto.type,
      capacityLoad: dto.capacityLoad,
      capacityPassengers: dto.capacityPassengers,
      status: dto.status
    });
  }
}
