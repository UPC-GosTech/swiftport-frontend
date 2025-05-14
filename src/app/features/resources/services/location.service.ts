import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Location } from '../models/location.entity';
import { LocationResponse } from 'server/models/location.response';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { LocationAssembler } from '../mappers/location.assembler';

const locationEndPoint = environment.locationEndPoint;

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService<LocationResponse> {
  constructor() {
    super();
    this.resourceEndpoint = locationEndPoint;
  }

  getAllLocations(): Observable<Location[]> {
    return this.getAll().pipe(
      map(locationResponses => 
        locationResponses.map(response => LocationAssembler.toEntity(response))
      )
    );
  }

  getLocationById(id: number): Observable<Location | undefined> {
    return this.getById(id).pipe(
      map(response => response ? LocationAssembler.toEntity(response) : undefined)
    );
  }

  createLocation(location: Location): Observable<Location> {
    const locationResponse = LocationAssembler.toResponse(location);
    return this.create(locationResponse).pipe(
      map(response => LocationAssembler.toEntity(response))
    );
  }

  updateLocation(location: Location): Observable<Location> {
    const locationResponse = LocationAssembler.toResponse(location);
    return this.update(locationResponse.id, locationResponse).pipe(
      map(response => LocationAssembler.toEntity(response))
    );
  }

  deleteLocation(id: number): Observable<boolean> {
    return this.delete(id);
  }
}
