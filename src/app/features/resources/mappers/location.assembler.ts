import { Location } from "../models/location.entity";
import { LocationResponse } from "server/models/location.response";
import { Coordinate } from "../models/coordinate.entity";

export interface LocationDTO {
  id: number;
  zoneId: number;
  name: string;
  description: string;
  ubication: {
    latitude: number;
    longitude: number;
  };
}

export interface CreateLocationDTO {
  zoneId: number;
  name: string;
  description: string;
  ubication: {
    latitude: number;
    longitude: number;
  };
}

export class LocationAssembler {
  static toResponse(location: Location): LocationResponse {
    return {
      id: location.id,
      zoneId: location.zoneId,
      name: location.name,
      description: location.description,
      ubication: {
        latitude: location.ubication.latitude,
        longitude: location.ubication.longitude
      }
    }
  }

  static toEntity(dto: LocationResponse): Location {
    const coordinate = new Coordinate(
      dto.ubication.latitude,
      dto.ubication.longitude
    );

    return new Location(
      dto.id,
      dto.zoneId,
      dto.name,
      dto.description,
      coordinate
    );
  }

  static toCreateDTO(location: Location): CreateLocationDTO {
    return {
      zoneId: location.zoneId,
      name: location.name,
      description: location.description,
      ubication: {
        latitude: location.ubication.latitude,
        longitude: location.ubication.longitude
      }
    };
  }
}
