import { ConstantService } from './../constant.service';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private alertSubject = new Subject<any>();
  private toastSubject = new Subject<any>();

  public keepAfterNavigationChange = false;

  constructor(
    private router: Router,
    private constantService: ConstantService
  ) {
    // clear messages on route change depending on keepAfterNavigationChange value
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear messages
          this.clearAllMessages();
        }
      }
    });
  }

  getAlertMessage(): Observable<any> {
    return this.alertSubject.asObservable();
  }

  getToastMessage(): Observable<any> {
    return this.toastSubject.asObservable();
  }

  generateMessage(
    message: string,
    messageType: string,
    type: string,
    keepAfterNavigationChange: boolean
  ) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    if (messageType === this.constantService.MESSAGE_TYPE_ALERT) {
      this.alertSubject.next({ type, text: message, messageType });
    } else if (messageType === this.constantService.MESSAGE_TYPE_TOAST) {
      this.toastSubject.next({ type, text: message, messageType });
    }
  }

  clearAlertMessages() {
    this.alertSubject.next();
  }

  clearToastMessages() {
    this.toastSubject.next();
  }

  clearAllMessages() {
    this.clearAlertMessages();
    this.clearToastMessages();
  }
}
