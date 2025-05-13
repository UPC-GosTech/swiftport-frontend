import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Zone } from '../models/zone.entity';
import { ZoneResponse } from 'server/models/zone.response';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { ZoneAssembler } from '../mappers/zone.assembler';
import { LocationService } from './location.service';
import { Location } from '../models/location.entity';

const zoneEndPoint = environment.zoneEndPoint;

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends BaseService<ZoneResponse> {
  constructor(private locationService: LocationService) {
    super();
    this.resourceEndpoint = zoneEndPoint;
  }

  getAllZones(): Observable<Zone[]> {
    return this.getAll().pipe(
      switchMap(zoneResponses => {
        // Primero convertimos las respuestas a entidades
        const zones = zoneResponses.map(zoneResponse => 
          ZoneAssembler.toEntity(zoneResponse)
        );
        
        // Luego obtenemos las ubicaciones para cada zona
        return this.locationService.getAllLocations().pipe(
          map(locations => {
            // Asignamos las ubicaciones a cada zona correspondiente
            return zones.map(zone => {
              zone.locations = locations.filter(location => 
                location.zoneId === zone.id
              );
              return zone;
            });
          })
        );
      })
    );
  }

  getZoneById(id: number): Observable<Zone | undefined> {
    return this.getById(id).pipe(
      switchMap(zoneResponse => {
        if (!zoneResponse) {
          return new Observable<undefined>(subscriber => subscriber.next(undefined));
        }
        
        const zone = ZoneAssembler.toEntity(zoneResponse);
        
        // Obtenemos las ubicaciones de la zona
        return this.locationService.getAllLocations().pipe(
          map(locations => {
            zone.locations = locations.filter(location => 
              location.zoneId === zone.id
            );
            return zone;
          })
        );
      })
    );
  }

  createZone(zone: Zone): Observable<Zone> {

    const zoneResponse = ZoneAssembler.toResponse(zone);
    console.log('createZone', zoneResponse);
    return this.create(zoneResponse).pipe(
      map(createdResponse => ZoneAssembler.toEntity(createdResponse))
    );
  }

  updateZone(zone: Zone): Observable<Zone> {
    const zoneResponse = ZoneAssembler.toResponse(zone);
    return this.update(zoneResponse.id, zoneResponse).pipe(
      map(updatedResponse => ZoneAssembler.toEntity(updatedResponse))
    );
  }

  deleteZone(id: number): Observable<boolean> {
    return this.delete(id);
  }
}
