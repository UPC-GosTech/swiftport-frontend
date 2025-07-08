import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Location } from '../models/location.entity';
import { LocationResource, CreateLocationResource, UpdateLocationStatusResource } from '../models/zone.resource';
import { LocationAssembler } from '../mappers/location.assembler';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = `${environment.apiBaseUrl}/zones`;

  constructor(private http: HttpClient) {}

  /**
   * Get all locations from all zones
   */
  getAllLocations(): Observable<Location[]> {
    return this.http.get<LocationResource[]>(`${this.baseUrl}/zones/locations`).pipe(
      map(resources => resources.map(resource => LocationAssembler.toEntityFromResource(resource)))
    );
  }

  /**
   * Get a specific location by ID
   */
  getLocationById(id: number): Observable<Location> {
    return this.http.get<LocationResource>(`${this.baseUrl}/locations/${id}`).pipe(
      map(resource => LocationAssembler.toEntityFromResource(resource))
    );
  }

  /**
   * Get all locations in a specific zone
   */
  getLocationsByZoneId(zoneId: number): Observable<Location[]> {
    return this.http.get<LocationResource[]>(`${this.baseUrl}/${zoneId}/locations`).pipe(
      map(resources => resources.map(resource => LocationAssembler.toEntityFromResource(resource)))
    );
  }

  /**
   * Add a new location to a specific zone
   */
  addLocationToZone(zoneId: number, location: Location): Observable<Location> {
    const createResource = LocationAssembler.toResourceFromEntity(location);
    return this.http.post<LocationResource>(`${this.baseUrl}/${zoneId}/locations`, createResource).pipe(
      map(resource => LocationAssembler.toEntityFromResource(resource))
    );
  }

  /**
   * Update the status of a specific location
   */
  updateLocationStatus(locationId: number, status: string): Observable<Location> {
    const updateResource: UpdateLocationStatusResource = { status };
    return this.http.patch<LocationResource>(`${this.baseUrl}/locations/${locationId}/status`, updateResource).pipe(
      map(resource => LocationAssembler.toEntityFromResource(resource))
    );
  }

  /**
   * Get all locations with a specific status
   */
  getLocationsByStatus(status: string): Observable<Location[]> {
    return this.http.get<LocationResource[]>(`${this.baseUrl}/locations/status/${status}`).pipe(
      map(resources => resources.map(resource => LocationAssembler.toEntityFromResource(resource)))
    );
  }
}
