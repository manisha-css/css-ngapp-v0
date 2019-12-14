import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { SharedRoutingModule } from './shared-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './exceptions/http-error.interceptor';
import { ExceptionsComponent } from './exceptions/exceptions.component';
import { ExceptionGeneralComponent } from './exceptions/exceptions-general/exceptions-general.component';
import { ConstantService } from './constant.service';
import { MessageComponent } from './messages/message/message.component';
import { MessageService } from './messages/message.service';
import { AlertMessageService } from './messages/alert-message.service';
import { ToastMessageService } from './messages/toast-message.service';

@NgModule({
  declarations: [
    ExceptionsComponent,
    ExceptionGeneralComponent,
    MessageComponent
  ],
  imports: [
    LoggerModule.forRoot({
      level: !environment.production
        ? NgxLoggerLevel.DEBUG
        : NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.OFF
    }),
    CommonModule,
    SharedRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ConstantService,
    MessageService,
    AlertMessageService,
    ToastMessageService
  ],
  exports: [MessageComponent]
})
export class SharedModule {}
