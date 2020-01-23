import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConstantService } from '../constant.service';
import { ToastMessageService } from '../messages/toast-message.service';
import { AlertMessageService } from '../messages/alert-message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    private logger: NGXLogger,
    private toastMessageService: ToastMessageService,
    private alertMessageService: AlertMessageService,
    private constantService: ConstantService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred.
          this.logger.error('Client side error: [' + error.error.message + ']');
        } else {
          // backend returns errorResponse with message
          if (error.status === 0) {
            // status returned will be 0 if backend server is not running
            this.logger.error(this.constantService.BACKEND_SERVER_DOWN);
            this.toastMessageService.error(
              this.constantService.BACKEND_SERVER_DOWN
            );
            return throwError(error);
          }
          if (error.status === 404) {
            this.logger.error(this.constantService.BACKEND_NOT_FOUND);
            this.toastMessageService.error(
              this.constantService.BACKEND_NOT_FOUND
            );
            return throwError(error);
          }

          // Common handler for 500 status
          if (error.status === 500) {
            if (error.error === undefined || error.error === null) {
              this.logger.error(
                'Error Status[: ' +
                  error.status +
                  '], Message: [' +
                  error.message +
                  '], Timestamp: [' +
                  error.error.timestamp +
                  ']'
              );
              this.alertMessageService.error(error.message);
            } else {
              this.logger.error(
                'Error Status[: ' +
                  error.status +
                  '], Message: [' +
                  error.error.message +
                  '], Timestamp: [' +
                  error.error.timestamp +
                  ']'
              );
              this.alertMessageService.error(error.error.message);
            }
          }
        }
        // return the error on the upper level:
        return throwError(error);
      })
    );
  }
}
