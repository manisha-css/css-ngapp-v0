import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../message.service';
import { ConstantService } from '../../constant.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit, OnDestroy {
  alertSubscription: Subscription;
  toastSubscription: Subscription;
  messageType: string;
  alertMessage: any;
  toastMessage: any;
  showtoast: boolean;

  constructor(
    private messageService: MessageService,
    public constantService: ConstantService
  ) {}

  ngOnInit() {
    this.showtoast = false;
    this.alertSubscription = this.messageService
      .getAlertMessage()
      .subscribe(message => {
        this.alertMessage = message;
      });
    this.toastSubscription = this.messageService
      .getToastMessage()
      .subscribe(message => {
        this.toastMessage = message;
        this.showtoast = true;
        setTimeout(() => {
          this.showtoast = false;
        }, this.constantService.MESSAGE_TOAST_TIMEOUT);
      });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.toastSubscription.unsubscribe();
  }
}
