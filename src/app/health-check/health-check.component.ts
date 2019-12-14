import { Component, OnInit } from '@angular/core';
import { HealthCheckService } from './health-check.service';
import { NGXLogger } from 'ngx-logger';
import { ToastMessageService } from '../shared/messages/toast-message.service';
import { AlertMessageService } from '../shared/messages/alert-message.service';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css']
})
export class HealthCheckComponent implements OnInit {
  result: string;

  constructor(
    private logger: NGXLogger,
    private toastMessageService: ToastMessageService,
    private alertMessageService: AlertMessageService,
    private healthCheckService: HealthCheckService
  ) {}

  ngOnInit() {
    this.getServerHealthCheck();
  }

  getServerHealthCheck() {
    this.healthCheckService.getServerHealthCheck().subscribe(
      (response: any) => {
        this.logger.debug(
          'debug Received response from server [' + response.message + ']'
        );
        this.result = response.message;
        this.toastMessageService.success(this.result);
        this.alertMessageService.success(this.result);
      },
      () => {
        this.logger.error('Received error response from server');
        this.alertMessageService.error('errot');
        this.toastMessageService.error('error.message');
      }
    );
  }
}
