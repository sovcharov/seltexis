import { CookieService } from 'ngx-cookie';
import { Injectable } from '@angular/core';


@Injectable()
export class MyCookieService {

  constructor(
    private cookieService: CookieService,
  ) {

  }

  getUser() {
    return this.cookieService.getObject('user');
  }

  putUser(user) {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    this.cookieService.putObject('user', user, { expires: date });
  }

  getCompany() {
    return this.cookieService.getObject('company');
  }

  putCompany(company) {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    this.cookieService.putObject('company', company, { expires: date });
  }

  getUserQuoteVars() {
    return this.cookieService.getObject('quoteVars');
  }

  putUserQuoteVars(quoteVars) {
    let date = new Date();
    date.setDate(date.getDate() + 365);
    this.cookieService.putObject('quoteVars', quoteVars, { expires: date });
  }

  deleteUser(){
    this.cookieService.remove('user');
  }

}
