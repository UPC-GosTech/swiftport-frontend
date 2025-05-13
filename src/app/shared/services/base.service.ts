import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {inject} from '@angular/core';
import {catchError, Observable, retry, throwError} from 'rxjs';

/**
 * Abstract base service class providing common CRUD operations for REST API endpoints.
 * @template T The type of resource this service manages
 */
export abstract class BaseService<T> {
  /** HTTP headers configuration for JSON communication */
  protected httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
  /** Base URL for the server API */
  protected serverBaseUrl: string =  `${environment.serverBaseUrl}`;
  /** Endpoint path for the specific resource */

}
