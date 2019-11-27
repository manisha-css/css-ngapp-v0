import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthCheckRoutingModule } from './health-check-routing.module';
import { HealthCheckComponent } from './health-check.component';
import { HealthCheckService } from './health-check.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HealthCheckComponent],
  imports: [
    CommonModule,
    HealthCheckRoutingModule,
    HttpClientModule
  ],
  providers: [HealthCheckService]
})
export class HealthCheckModule { }
