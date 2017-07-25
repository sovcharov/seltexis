import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';
import { ServerService } from './server.service';


interface Right {
  companyId: number,
  rightId: number
}

export interface User {
  firstName: string,
  lastName: string,
  id: number,
  token: number,
  authenticated?: boolean,
  rights: Right[]
}

@Component({
})
export class UserService {
  user: User;
  tempUser: any;
  constructor(
    private cookieService: CookieService,
    private serverService: ServerService
  ) {
    // let date = new Date();
    // date.setDate(date.getDate() + 30);
    // this.cookieService.putObject('user', { id: 0, firstName: 'Sergei', lastName: 'Ovcharov', email: 'smartauto@mail.ru', token: 12345, authenticated: true, rights: [{ companyId: 1, rightId: 1 }] }, { expires: date });
    this.tempUser = this.cookieService.getObject('user');
    if (this.tempUser) {
      this.user = this.tempUser;
      this.user.authenticated = false;
    } else {
      this.user.authenticated = false;
    }
  }

  private getCookie() {
    let user = this.cookieService.get('user');
    return user;
  }

}
