import { Zone } from "../models/zone.entity";
import { ZoneResponse } from "server/models/zone.response";

export class ZoneAssembler {
  static toResponse(zone: Zone): ZoneResponse {
    return {
      id: zone.id,
      name: zone.name,
      description: zone.description,
      active: zone.active
    }
  }

  static toEntity(dto: ZoneResponse): Zone {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      active: dto.active,
      locations: []
    }
  }
}