import { Component, OnInit } from '@angular/core';

import { MyCookieService } from './my-cookie.service';
import { ServerService } from './server.service';


interface Right {
  companyId: number,
  rightId: number
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
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
    private myCookieService: MyCookieService,
    private serverService: ServerService
  ) {
    // let date = new Date();
    // date.setDate(date.getDate() + 30);
    // this.cookieService.putObject('user', { id: 0, firstName: 'Sergei', lastName: 'Ovcharov', email: 'smartauto@mail.ru', token: 12345, authenticated: true, rights: [{ companyId: 1, rightId: 1 }] }, { expires: date });
    this.tempUser = this.myCookieService.getUser();
    if (this.tempUser) {
      this.user = this.tempUser;
      this.user.authenticated = false;
    } else {
      this.user.authenticated = false;
    }
  }

}
