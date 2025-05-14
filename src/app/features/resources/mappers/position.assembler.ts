import { Position } from "../models/position.entity";
import { PositionResponse } from "server/models/positions.response";

export class PositionAssembler {
  static toResponse(position: Position): PositionResponse {
    return {
      id: position.id,
      name: position.name,
      description: position.description
    }
  }

  static toEntity(dto: PositionResponse): Position {
    return new Position(
      dto.id,
      dto.name,
      dto.description
    );
  }
}
