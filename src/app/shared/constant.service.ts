import { Injectable, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

@Injectable()
export class ConstantService {
  constructor(@Inject(APP_BASE_HREF) public baseHref: string) {}

  // error messages
  public BACKEND_SERVER_DOWN =
    'Backend server seems to be down, please try again later';
  public BACKEND_NOT_FOUND = 'Backend server api not found';

  // alert and toast messages
  public MESSAGE_TYPE_ALERT = 'alert';
  public MESSAGE_TYPE_TOAST = 'toast';

  public MESSAGE_SUCESS = 'success';
  public MESSAGE_INFO = 'info';
  public MESSAGE_ERROR = 'error';

  public MESSAGE_TOAST_TIMEOUT = 2500;

  public capitalizeFirstLetter(inputText: string) {
    if (inputText && inputText.length > 0) {
      return inputText.charAt(0).toUpperCase() + inputText.slice(1);
    }
    return inputText;
  }

  addHttptHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    let selectedLang = this.removeFirstAndLastSlash(this.baseHref).trim();
    if (!this.removeFirstAndLastSlash(this.baseHref)) {
      selectedLang = 'en';
    }
    headers = headers.append('Accept-Language', selectedLang);
    return headers;
  }

  removeFirstAndLastSlash(tobeConvertedString: string): string {
    return tobeConvertedString.replace(/^\/|\/$/g, '');
  }
}
