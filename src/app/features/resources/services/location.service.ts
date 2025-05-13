import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';

const locationEndPoint = environment.locationEndPoint;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
}
