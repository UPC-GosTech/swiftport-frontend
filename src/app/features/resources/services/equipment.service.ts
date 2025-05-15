import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Equipment } from '../models/equipment.entity';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { EquipmentResponse } from 'server/models/equipment.response';
import { EquipmentAssembler } from '../mappers/equipment.assembler';

const equipmentEndPoint = environment.equipmentEndPoint;

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends BaseService<EquipmentResponse> {

  constructor() {
    super();
    this.serverBaseUrl = environment.mockBaseUrl;
    this.resourceEndpoint = equipmentEndPoint;
  }

  getAllEquipment(): Observable<Equipment[]> {
    return this.getAll().pipe(
      map(equipmentResponses => 
        equipmentResponses.map(response => EquipmentAssembler.toEntity(response))
      )
    );
  }

  getEquipmentById(id: number): Observable<Equipment | undefined> {
    return this.getById(id).pipe(
      map(equipmentResponse => 
        equipmentResponse ? EquipmentAssembler.toEntity(equipmentResponse) : undefined
      )
    );
  }

  createEquipment(equipment: Equipment): Observable<Equipment> {
    const equipmentResponse = EquipmentAssembler.toResponse(equipment);
    return this.create(equipmentResponse).pipe(
      map(createdResponse => EquipmentAssembler.toEntity(createdResponse))
    );
  }

  updateEquipment(equipment: Equipment): Observable<Equipment> {
    const equipmentResponse = EquipmentAssembler.toResponse(equipment);
    return this.update(equipmentResponse.id, equipmentResponse).pipe(
      map(updatedResponse => EquipmentAssembler.toEntity(updatedResponse))
    );
  }

  deleteEquipment(id: number): Observable<boolean> {
    return this.delete(id);
  }
}
