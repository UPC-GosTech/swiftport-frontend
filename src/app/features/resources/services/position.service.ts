import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Position } from '../models/position.entity';
import { PositionResponse } from 'server/models/positions.response';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { PositionAssembler } from '../mappers/position.assembler';

const positionsEndPoint = environment.positionsEndPoint;

@Injectable({
  providedIn: 'root'
})
export class PositionService extends BaseService<PositionResponse> {
  constructor() {
    super();
    this.resourceEndpoint = positionsEndPoint;
  }

  getAllPositions(): Observable<Position[]> {
    return this.getAll().pipe(
      map(positionResponses => 
        positionResponses.map(positionResponse => 
          PositionAssembler.toEntity(positionResponse)
        )
      )
    );
  }

  getPositionById(id: number): Observable<Position | undefined> {
    return this.getById(id).pipe(
      map(positionResponse => 
        positionResponse ? PositionAssembler.toEntity(positionResponse) : undefined
      )
    );
  }

  createPosition(position: Position): Observable<Position> {
    const positionResponse = PositionAssembler.toResponse(position);
    return this.create(positionResponse).pipe(
      map(createdResponse => PositionAssembler.toEntity(createdResponse))
    );
  }

  updatePosition(position: Position): Observable<Position> {
    const positionResponse = PositionAssembler.toResponse(position);
    return this.update(positionResponse.id, positionResponse).pipe(
      map(updatedResponse => PositionAssembler.toEntity(updatedResponse))
    );
  }

  deletePosition(id: number): Observable<boolean> {
    return this.delete(id);
  }
} 