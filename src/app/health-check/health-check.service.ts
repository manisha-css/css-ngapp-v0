import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  HEALTHCHECK_URL = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getServerHealthCheck(): Observable<any> {
    return this.httpClient.get<any>(this.HEALTHCHECK_URL + '/healthcheck');
  }
}
