import { Injectable } from '@angular/core';
import {Observable, of, switchMap} from 'rxjs';
import { Zone } from '../models/zone.entity';
import { Location } from '../models/location.entity';
import { Coordinate } from '../models/coordinate.entity';
import {environment} from '../../../../environments/environment';
import {BaseService} from '../../../shared/services/base.service';

const zoneEndPoint = environment.zoneEndPoint;
const locationEndPoint = environment.locationEndPoint;

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends BaseService<Zone> {
  // Simulated data storage - Replace with API calls in production
  private zones: Zone[] = [
    new Zone(1, 'Terminal A', 'Terminal principal de pasajeros', []),
    new Zone(2, 'Terminal B', 'Terminal internacional', []),
    new Zone(3, 'Área de Carga', 'Manejo y almacenamiento de carga', []),
    new Zone(4, 'Mantenimiento', 'Zona de mantenimiento de aeronaves', [])
  ];

  constructor() {
    super();
    this.resourceEndpoint = zoneEndPoint;
  }

  getAllZones(): Observable<any[]> {
    return this.getAll();
  }

  getZones(): Observable<Zone[]> {
    return of(this.zones);
  }

  getZoneById(id: number): Observable<Zone | undefined> {
    return this.getById(id)
  }

  addZone(zone: Zone): Observable<Zone> {
    return this.create(zone);
  }

  createZone(name: string, description: string): Observable<Zone> {
    const newId = Math.max(...this.zones.map(z => z.id), 0) + 1;
    const newZone = new Zone(newId, name, description, []);
    this.zones.push(newZone);
    return of(newZone);
  }

  updateZone(id: number, name: string, description: string): Observable<Zone | undefined> {
    const index = this.zones.findIndex(z => z.id === id);
    if (index !== -1) {
      this.zones[index].name = name;
      this.zones[index].description = description;
      return of(this.zones[index]);
    }
    return of(undefined);
  }

  toggleZoneActive(id: number): Observable<Zone | undefined> {
    const index = this.zones.findIndex(z => z.id === id);
    if (index !== -1) {
      this.zones[index].active = !this.zones[index].active;
      return of(this.zones[index]);
    }
    return of(undefined);
  }

  deleteZone(id: number): Observable<boolean> {
    const initialLength = this.zones.length;
    this.zones = this.zones.filter(z => z.id !== id);
    return of(initialLength !== this.zones.length);
  }

  // Location management within zones
  addLocation(zoneId: number, name: string, description: string, coordinate: Coordinate): Observable<Location | undefined> {
    const newLocation: Location = {
      id: 0,  // ID lo asignará el servidor cuando se haga el `POST`
      zoneId,
      name,
      description,
      ubication: coordinate,  // Coordenadas de la ubicación
    };

    return this.http.post<any>(`${environment.serverBaseUrl}/location`, newLocation).pipe(
      // Después de agregar la location, actualizamos la zone
      switchMap((location) => {
        // Ahora obtenemos la zone para actualizar su array de locations
        return this.http.get<any>(`${environment.serverBaseUrl}/zone/${zoneId}`).pipe(
          switchMap((zone) => {
            // Agregar la nueva location al array de locations de la zone
            const updatedZone = { ...zone, locations: [...zone.locations, location] };

            // Hacer un PUT para actualizar la zone con la nueva location
            return this.http.put<any>(`${environment.serverBaseUrl}/zone/${zoneId}`, updatedZone);
          })
        );
      })
    );
  }

  updateLocation(location: Location): Observable<Location | undefined> {
    const zoneIndex = this.zones.findIndex(z => z.id === location.zoneId);
    if (zoneIndex === -1) return of(undefined);

    const locationIndex = this.zones[zoneIndex].locations.findIndex(l => l.id === location.id);
    if (locationIndex === -1) return of(undefined);

    this.zones[zoneIndex].locations[locationIndex] = location;
    return of(location);
  }

  deleteLocation(zoneId: number, locationId: number): Observable<boolean> {
    const zoneIndex = this.zones.findIndex(z => z.id === zoneId);
    if (zoneIndex === -1) return of(false);

    const initialLength = this.zones[zoneIndex].locations.length;
    this.zones[zoneIndex].locations = this.zones[zoneIndex].locations.filter(l => l.id !== locationId);

    return of(initialLength !== this.zones[zoneIndex].locations.length);
  }
}
