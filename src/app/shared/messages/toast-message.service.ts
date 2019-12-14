import { MessageService } from './../messages/message.service';
import { Injectable } from '@angular/core';
import { ConstantService } from '../constant.service';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  constructor(
    private messageService: MessageService,
    private constantService: ConstantService
  ) {}

  success(message: string, keepAfterNavigationChange = false) {
    this.messageService.generateMessage(
      message,
      this.constantService.MESSAGE_TYPE_TOAST,
      this.constantService.MESSAGE_SUCESS,
      keepAfterNavigationChange
    );
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.messageService.generateMessage(
      message,
      this.constantService.MESSAGE_TYPE_TOAST,
      this.constantService.MESSAGE_ERROR,
      keepAfterNavigationChange
    );
  }

  info(message: string, keepAfterNavigationChange = false) {
    this.messageService.generateMessage(
      message,
      this.constantService.MESSAGE_TYPE_TOAST,
      this.constantService.MESSAGE_INFO,
      keepAfterNavigationChange
    );
  }
}
