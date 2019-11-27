import { Component, OnInit } from '@angular/core';
import { HealthCheckService } from './health-check.service';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css']
})
export class HealthCheckComponent implements OnInit {
  result: string;

  constructor(private healthCheckService: HealthCheckService) { }

  ngOnInit() {
    this.getServerHealthCheck();
  }

  getServerHealthCheck() {
    this.healthCheckService
      .getServerHealthCheck()
      .subscribe(
        (response: any) => {
          this.result = response.message;
        },
        () => {}
      );
  }

}
