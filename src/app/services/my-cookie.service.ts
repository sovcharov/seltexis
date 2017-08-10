import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Component({
})
export class MyCookieService {

  constructor(
    private cookieService: CookieService,
  ) {
    // let date = new Date();
    // date.setDate(date.getDate() + 30);
    // this.cookieService.putObject('user', { id: 0, firstName: 'Sergei', lastName: 'Ovcharov', email: 'smartauto@mail.ru', token: 12345, authenticated: true, rights: [{ companyId: 1, rightId: 1 }] }, { expires: date });
    // this.cookieService.putObject('company', { id: 1, name: 'seltex', fullName: 'Seltex, Inc', email: 'sales@seltex.ru' });
    // console.log(this.getCompany());
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

}
