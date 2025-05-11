import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Zone } from '../models/zone.entity';
import { Location } from '../models/location.entity';
import { Coordinate } from '../models/coordinate.entity';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  // Simulated data storage - Replace with API calls in production
  private zones: Zone[] = [
    new Zone(1, 'Terminal A', 'Terminal principal de pasajeros', []),
    new Zone(2, 'Terminal B', 'Terminal internacional', []),
    new Zone(3, 'Área de Carga', 'Manejo y almacenamiento de carga', []),
    new Zone(4, 'Mantenimiento', 'Zona de mantenimiento de aeronaves', [])
  ];


  constructor() {
    // Initialize some locations for testing
    this.addLocation(1, 'Gate A1', 'Boarding gate', new Coordinate(40.123, -74.567));
    this.addLocation(1, 'Gate A2', 'Boarding gate', new Coordinate(40.124, -74.568));
    this.addLocation(2, 'Gate B1', 'International gate', new Coordinate(40.125, -74.569));
  }

  getZones(): Observable<Zone[]> {
    return of(this.zones);
  }

  getZoneById(id: number): Observable<Zone | undefined> {
    return of(this.zones.find(zone => zone.id === id));
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
    const zoneIndex = this.zones.findIndex(z => z.id === zoneId);
    if (zoneIndex === -1) return of(undefined);
    
    const locations = this.zones[zoneIndex].locations || [];
    const newId = locations.length > 0 ? Math.max(...locations.map(l => l.id), 0) + 1 : 1;
    
    const newLocation = new Location(
      newId, 
      zoneId, 
      name, 
      description, 
      coordinate
    );
    
    if (!this.zones[zoneIndex].locations) {
      this.zones[zoneIndex].locations = [];
    }
    
    this.zones[zoneIndex].locations.push(newLocation);
    return of(newLocation);
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