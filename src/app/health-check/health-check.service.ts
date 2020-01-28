import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConstantService } from '../shared/constant.service';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  constructor(
    private constantService: ConstantService,
    private httpClient: HttpClient
  ) {}

  getServerHealthCheck(): Observable<any> {
    return this.httpClient.get<any>(
      environment.WEBSERVICE_URL + '/healthcheck',
      { headers: this.constantService.addHttptHeader() }
    );
  }
}
