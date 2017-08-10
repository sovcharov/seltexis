import { Component, OnInit } from '@angular/core';

import { MyCookieService } from './my-cookie.service';
import { ServerService } from './server.service';


interface Right {
  companyId: number,
  rights: number[]
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  token: number,
  authenticated: boolean,
  rights: Right[]
}

@Component({
})
export class UserService {

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    token: 0,
    authenticated: false,
    rights: []
  };
  tempUser: any;
  constructor(
    private myCookieService: MyCookieService
  ) {
    this.tempUser = this.myCookieService.getUser();
    if (this.tempUser) {
      this.user = this.tempUser;
    } else {
      this.user.authenticated = false;
    }
  }

  saveUserCookie() {
    this.myCookieService.putUser(this.user)
  }

}
